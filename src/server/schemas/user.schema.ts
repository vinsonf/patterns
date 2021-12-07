import mongoose from 'mongoose';
const {Schema, model} = mongoose;

const userSchema = new Schema<any>({
   socketId: String,
   username: String,

});

export const UserModel = model('User', userSchema);