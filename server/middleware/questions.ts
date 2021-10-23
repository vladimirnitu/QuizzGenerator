import _ from 'lodash'
import * as questionApi from '../api/questions'
import * as helper from '../utils/helper'

export const createQuestion = (req: any, res: any, next: any) => {
    const codeOrName = req.params.codeorname
    const question = _.get(req,'body.question')
    
    return questionApi.createQuestion(codeOrName, question, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findOneQuestion = (req:any, res:any , next:any) => {
    const questionName = _.get(req,'body.name');

    return questionApi.findOneQuestion(questionName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findAllQuestionOfAQuestionary = (req:any, res:any , next:any) => {
    const codeOrName = req.params.codeorname
    
    return questionApi.findAllQuestionOfAQuestionary(codeOrName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deleteQuestion = (req:any, res:any , next:any ) => {
    const questionName = _.get(req,'body.questionName')
    return questionApi.deleteQuestion(questionName, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}