import _ from "lodash"
import QuestionaryTable, { Questionary } from "../models/Questionary"
import QuestionsTable from "../models/Questions"
import AnswerTable from "../models/Answer"
export const createQuestion = (questionaryNameOrCode: any, question: any, next: any) => {

    let query1 = { Name: { $eq: questionaryNameOrCode } }
    let query2 = { Code: { $eq: questionaryNameOrCode } }

    return QuestionaryTable
        .findOne({ $or: [query1, query2] })
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                let newQuestion = {
                    Questionary: doc._id,
                    Name: _.get(question, 'name', ''),
                    PossibleAnswer: _.get(question, 'possibleAnswer'),
                    QuestionaryName: doc.Name,
                    QuestionaryCode: doc.Code
                }
                let questionTable = new QuestionsTable(newQuestion)
                questionTable.save((err: any) => {
                    if (err)
                        next(err, null)
                    else
                        next(null, newQuestion)
                })

            }
            else {
                next({}, null);
                return {};
            }
        })
}

export const findOneQuestion = (questionName: string, next: any) => {
    return QuestionsTable
        .find({ Name: { $eq: questionName } })
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
}

export const findAllQuestionOfAQuestionary = (questionaryNameOrCode: any, next: any) => {
    let query1 = { Name: { $eq: questionaryNameOrCode } }
    let query2 = { Code: { $eq: questionaryNameOrCode } }
    return QuestionaryTable
        .findOne({ $or: [query1, query2] })
        .then((doc: any) => {
            if (!_.isNil(doc)) {

                return QuestionsTable
                    .find({ QuestionaryName: { $eq: doc.Name } })
                    .then((doc:any) => { next(null, doc); return doc })
            }
            else {
                next({}, null);
                return {};
            }
        })
}
export const deleteQuestion = (questionName: string,next:any) => {
    return QuestionsTable
    .deleteMany({ Name: {$eq: questionName} })
    .then((docQuestions: any) => {
        return AnswerTable
            .deleteMany({ QuestionName: {$eq: questionName} })
            .then((docAnswer: any) => {
                return Promise.resolve(docAnswer)
                    .then((doc) => { next(null, "Question deleted") })
            })
            .catch((err: any) => next(err, null))
    })
}