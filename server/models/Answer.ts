import mongoose, { Schema } from 'mongoose';
export const Answer = new mongoose.Schema({
    Sex: { type: String},
    GroupAge: { type: String},
    Occupation: { type: String},
    Urbanism: { type: String },
    UserName: { type: String},
    Question: {  type: Schema.Types.ObjectId, ref:'Question'}, 
    AnswerName: {type: String},
    Category: {  type: Schema.Types.ObjectId, ref:'Category'},
    Questionary: {  type: Schema.Types.ObjectId, ref:'Questionary'},
})

const AnswerTable = mongoose.model('Answer', Answer);

export default AnswerTable;