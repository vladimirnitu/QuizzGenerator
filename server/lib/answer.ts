import _ from "lodash"
import QuestionaryTable, { Questionary } from "../models/Questionary"
import QuestionsTable from "../models/Questions"
import AnswerTable from "../models/Answer"
import UserTable from "../models/User"
import { Promise } from 'bluebird'
export const createAnswer = (questionaryName: any, answers: any[], next: any) => {
    //answers: []: { questionName: string, answer: string }
    // return QuestionsTable
    //     .findOne({ Name: { $eq: questionName } })
    // .then((docQuestions: any) => {
    //     if (!_.isNil(docQuestions)) {
    //             return UserTable
    //                 .findOne({ UserName: { $eq: userName } })
    //                 .then((docUser: any) => {
    //                     if (!_.isNil(docUser)) {

    //                         let newAnswer = {
    //                             Sex: _.get(docUser,'Sex',''),
    //                             GroupAge: _.get(docUser,'GroupAge',''),
    //                             Occupation: _.get(docUser,'Occupation',''),
    //                             Urbanism: _.get(docUser, 'Urbanism',''),
    //                             UserName: userName,
    //                             Question: _.get(docQuestions,'_id',''),
    //                             QuestionName: _.get(docQuestions,'Name',''),
    //                             QuestionaryCode: _.get(docQuestions, 'QuestionaryCode',''),
    //                             CategoryName: _.get(docQuestions,'CategoryName'),
    //                             AnswerName: answer
    //                         }
    // let answerTable = new AnswerTable(newAnswer)
    // answerTable.save((err: any) => {
    //     if (err)
    //         next(err, null)
    //     else
    //         next(null, newAnswer)
    // })
    // }

    //                     else {
    //                         next({}, null);
    //                         return {};

    //                     }
    //                 })
    //         }
    // else {
    //     next({}, null);
    //     return {};
    // }
    //     })
    return QuestionaryTable
        .findOne({ Name: { $eq: questionaryName } })
        .then((docQuestionary: any) => {
            if (!_.isNil(docQuestionary)) {
                return Promise
                    .each(answers, (answer) => {
                        let newAnswer = {
                            Sex: _.get(answer, 'sex', ''),
                            GroupAge: _.get(answer, 'groupAge', ''),
                            Occupation: _.get(answer, 'occupation', ''),
                            Urbanism: _.get(answer, 'urbanism', ''),
                            // UserName: userName,
                            Question: _.get(answer, 'questionId', ''),
                            QuestionName: _.get(answer,'questionName',''),
                            QuestionaryCode: docQuestionary.Code,
                            CategoryName: docQuestionary.CategoryName,
                            AnswerName: _.get(answer, 'answer', '')
                        }
                        let answerTable = new AnswerTable(newAnswer)
                        answerTable.save((err: any) => {
                            if (err)
                                next(err, null)
                            else
                                next(null, newAnswer)
                        })
                    })
            }

            else {
                next({}, null);
                return {};
            }
        })
}

export const getAllAnswersOfAQuestion = (questionName: any, next: any) => {
    return AnswerTable
        .find({ QuestionName: { $eq: questionName } })
        .then((doc: any) => { next(null, doc); return doc })
}

export const findASpecificAnswer = (answerName: any, next: any) => {
    return AnswerTable
        .find({ AnswerName: { $eq: answerName } })
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
}

export const deleteAnAnswer = (answerName: any, next: any) => {
    return AnswerTable
        .deleteMany({ AnswerName: { $eq: answerName } })
        .then((docAnswer: any) => {
            return Promise.resolve(docAnswer)
                .then((doc) => { next(null, "Answer deleted") })
        })
        .catch((err: any) => next(err, null))
}