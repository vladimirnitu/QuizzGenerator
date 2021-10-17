import mongoose, { Schema } from 'mongoose';

export const Questionary = new mongoose.Schema({
    Name: { type: String, unique: true },
    Code: { type: String, unique:true},
    Questions: [{
        Question: {
            type: String
        }, PossibleAnswers:
            { type: Schema.Types.Mixed, required: true }
    }]

})

const QuestionaryTable = mongoose.model('Questionary', Questionary);

export default QuestionaryTable;