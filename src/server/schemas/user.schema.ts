import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema<{username: string, password: string, socketId: string}>({
   socketId: String,
   username: String,
   password: String,

});

export const UserModel = model('User', userSchema);