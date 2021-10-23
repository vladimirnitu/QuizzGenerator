import mongoose, { Schema } from 'mongoose';

export const Questionary = new mongoose.Schema({
    Name: { type: String,unique:true},
    Code: { type: String, unique:true},
    Category: {type: Schema.Types.ObjectId, ref:'Category'},
    CategoryName: {type: String},
    UserName: { type: String}
})

const QuestionaryTable = mongoose.model('Questionary', Questionary);

export default QuestionaryTable;``