import _ from 'lodash'
import * as answerApi from '../api/answer'
import * as helper from '../utils/helper'
var hexgen = require('hex-generator');
export const createAnswer = (req: any, res: any, next: any) => {
    const questionaryName = _.get(req, 'body.questionaryName');
    const answer = _.get(req, 'body.answers','')
    const sex = _.get(req,'body.sex','')
    const groupage = _.get(req, 'body.groupAge','')
    const occupation = _.get(req,'body.occupation','')
    const urbanism = _.get(req,'body.urbanism','')
    const userName =_.get(req,'body.username',hexgen(16))
    return answerApi.createAnswer(questionaryName,userName, answer,sex,groupage,occupation, urbanism, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export function getAllAnswersOfAQuestion(req: any, res: any, next: any) {
    const name = req.params.Name
    const questionaryName = req.params.QuestionaryName
    return answerApi.getAllAnswersOfAQuestion(name, questionaryName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export function findASpecificAnswer(req: any, res: any, next: any) {
    const answerName = _.get(req, 'answername')
    return answerApi.findASpecificAnswer(answerName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deleteAnAnswer = (req: any, res: any, next: any) => {
    const answerName = _.get(req, 'answername')
    return answerApi.deleteAnAnswer(answerName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}
