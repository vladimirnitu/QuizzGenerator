import mongoose, { Schema } from 'mongoose';
export const Answer = new mongoose.Schema({
    Email:  { type: String },
    Password:  { type: String },
    Name: { type: String },
    FirstName: { type: String},
    Sex: { type: String},
    GroupAge: { type: String},
    Occupation: { type: String},
    Urbanism: { type: String },
    UserName: { type: String},
    Question: { type: String}, 
    Answers:{ type: String, required: true },
    Category: {type: String},
    Questionary: { type:String}
})

const AnswerTable = mongoose.model('Answer', Answer);

export default AnswerTable;