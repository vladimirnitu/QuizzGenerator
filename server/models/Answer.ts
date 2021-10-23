import mongoose, { Schema } from 'mongoose';
export const Answer = new mongoose.Schema({
    Sex: { type: String },
    GroupAge: { type: String },
    Occupation: { type: String },
    Urbanism: { type: String },
    UserName: { type: String },
    Question: { type: Schema.Types.ObjectId, ref: 'Question' },
    QuestionName: { type: String },
    QuestionaryCode: { type: String },
    CategoryName: { type: String },
    AnswerName: { type: Schema.Types.Mixed },
})

const AnswerTable = mongoose.model('Answer', Answer);

export default AnswerTable;