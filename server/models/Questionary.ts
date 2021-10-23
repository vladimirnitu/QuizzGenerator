import mongoose, { Schema } from 'mongoose';

export const Questionary = new mongoose.Schema({
    Name: { type: String, unique: true },
    Code: { type: String, unique:true},
    Questions: [{  type: Schema.Types.ObjectId, ref:'Question'}]

})

const QuestionaryTable = mongoose.model('Questionary', Questionary);

export default QuestionaryTable;