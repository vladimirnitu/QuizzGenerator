import mongoose, { Schema } from 'mongoose';
export const User = new mongoose.Schema({
    Email:  { type: String },
    Password:  { type: String },
    Name: { type: String },
    FirstName: { type: String},
    Sex: { type: String},
    GroupAge: { type: String},
    Occupation: { type: String},
    Urbanism: { type: String },
    UserName: { type: String},
    Code: { type: String }
})

const UserTable = mongoose.model('User', User);

export default UserTable;