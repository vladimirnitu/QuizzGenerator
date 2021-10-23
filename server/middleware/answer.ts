import _ from 'lodash'
import * as answerApi from '../api/answer'
import * as helper from '../utils/helper'

export const createAnswer = (req: any, res: any, next: any) => {
    const questionName = _.get(req, 'body.questionName');
    const userName = _.get(req, 'body.userName', '')
    const answer = _.get(req, 'body.answer')

    return answerApi.createAnswer(questionName, userName, answer, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export function getAllAnswersOfAQuestion(req: any, res: any, next: any) {
    const name = req.params.Name
    return answerApi.getAllAnswersOfAQuestion(name, (err: any, data: any) => {
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
