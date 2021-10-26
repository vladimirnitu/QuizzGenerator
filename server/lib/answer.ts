import _ from "lodash"
import QuestionaryTable, { Questionary } from "../models/Questionary"
import QuestionsTable from "../models/Questions"
import AnswerTable from "../models/Answer"
import UserTable from "../models/User"
import { Promise } from 'bluebird'
export const createAnswer = (questionaryName: any, answers: any[],sex:any,groupage:any,occupation:any, urbanism:any, next: any) => {
    return QuestionaryTable
        .findOne({ Name: { $eq: questionaryName } })
        .then((docQuestionary: any) => {
            if (!_.isNil(docQuestionary)) {
                next(null,"answer created")
                return Promise
                    .each(answers, (answer) => {
                        let newAnswer = {
                            Sex: sex,
                            GroupAge: groupage,
                            Occupation: occupation,
                            Urbanism: urbanism,
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