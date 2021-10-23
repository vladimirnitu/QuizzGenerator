import mongoose, { Schema } from 'mongoose';

export const Questions = new mongoose.Schema({
    Name: { type: String, unique:true },
    PossibleAnswere: [{ type: Schema.Types.Mixed}]
    
})

const QuestionsTable = mongoose.model('Questions',Questions);

export default QuestionsTable;