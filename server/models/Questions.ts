import mongoose, { Schema } from 'mongoose';

export const Questions = new mongoose.Schema({
    Name: { type: String},
    PossibleAnswer: [{ type: Schema.Types.Mixed}],
    Questionary: {  type: Schema.Types.ObjectId, ref:'Questionary'},
    QuestionaryName: { type:String},
    CategoryName : { type: String},
    QuestionaryCode: {type: String}
})

const QuestionsTable = mongoose.model('Questions',Questions);

export default QuestionsTable;