import _ from "lodash"
import QuestionaryTable, { Questionary } from "../models/Questionary"
import QuestionsTable from "../models/Questions"
import AnswerTable from "../models/Answer"
import UserTable from "../models/User"

export const createAnswer = (questionName: any, userName: any, answer: any, next: any) => {

    return QuestionsTable
        .findOne({ Name: { $eq: questionName } })
        .then((docQuestions: any) => {
            if (!_.isNil(docQuestions)) {
                return UserTable
                    .findOne({ UserName: { $eq: userName } })
                    .then((docUser: any) => {
                        if (!_.isNil(docUser)) {
                             
                            let newAnswer = {
                                Sex: _.get(docUser,'Sex',''),
                                GroupAge: _.get(docUser,'GroupAge',''),
                                Occupation: _.get(docUser,'Occupation',''),
                                Urbanism: _.get(docUser, 'Urbanism',''),
                                UserName: userName,
                                Question: _.get(docQuestions,'_id',''),
                                QuestionName: _.get(docQuestions,'Name',''),
                                QuestionaryCode: _.get(docQuestions, 'QuestionaryCode',''),
                                CategoryName: _.get(docQuestions,'CategoryName'),
                                AnswerName: answer
                            }
                        let answerTable = new AnswerTable(newAnswer)
                        answerTable.save((err: any) => {
                            if (err)
                                next(err, null)
                            else
                                next(null, newAnswer)
                        })
                        }
                        
                        else {
                            next({}, null);
                            return {};

                        }
                    })
            }
            else {
                next({}, null);
                return {};
            }
        })
}

export const getAllAnswersOfAQuestion = (questionName: any, next:any) => {
    return AnswerTable
        .find({QuestionName: {$eq:questionName}})
        .then((doc: any) => { next(null, doc); return doc })
} 

export const findASpecificAnswer = (answerName: any, next:any) => {
    return AnswerTable
    .find({AnswerName: {$eq:answerName}})
    .cursor()
    .eachAsync((doc: any) => { next(null, doc); return doc })
}

export const deleteAnAnswer = (answerName:any, next:any) => {
    return AnswerTable
    .deleteMany({ AnswerName: {$eq: answerName} })
    .then((docAnswer: any) => {
        return Promise.resolve(docAnswer)
            .then((doc) => { next(null, "Answer deleted") })
    })
    .catch((err: any) => next(err, null))
}