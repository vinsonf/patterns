import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import * as socketIO from "socket.io";
import http from 'http';
import dotenv from "dotenv";
import path from 'path';
import { UserModel } from "./schemas/user.schema.js";





dotenv.config();

const __dirname = path.resolve();


dotenv.config();
const app = express();
const server = http.createServer(app);
const clientPath = path.join(__dirname, '/dist/client');
app.use(express.static(clientPath));

const io = new socketIO.Server(server,  { cors: {
  origin: '*'
}});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => console.log("Failed to Connect to DB", err));

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3501', 'http://localhost:8080']
}));
app.use(express.json());

app.get("/api/test", function (req, res) {
  res.json({message: "Hello World!"});
});
app.all("/api/*", function (req, res) {
  res.sendStatus(404);
});


server.listen(PORT, function () {
  console.log(`starting at localhost http://localhost:${PORT}`);
});


io.on('connection', function(socket){
  console.log('a user connected');
  socket.emit('message', 'work1');

  socket.on('register', (data) => {
    register({...data, socketId: socket.id});
  });
  socket.on('login', (data) => {
    login({...data, socketId: socket.id});
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    UserModel.findOneAndUpdate({socketId: socket.id}, {socketId: ''}).then(() => {
      console.log('socketId removed');
    });
  });
});

app.all("*", function (req, res) {
  const filePath = path.join(__dirname, '/dist/client/index.html');
  console.log(filePath);
  res.sendFile(filePath);
});

async function register(data: {username: string, password: string, socketId: string}) {
  console.log(data);
  const user = await UserModel.create(data);
  console.log(user);
}

async function login(data: {username: string, password: string, socketId: string}) {
  console.log('user login');
  const user =UserModel.findOne({
    username: data.username,
    password: data.password,
  });

  if (user[0]) {
    user.socketId = data.socketId;
    user.save();
  }
}