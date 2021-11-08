import _ from 'lodash'
import * as questionaryApi from '../api/questionary'
import * as helper from '../utils/helper'
var hexgen = require('hex-generator');

export const createAnonymQuestionary = (req:any, res:any, next:any) => {
    const name = _.get(req,'body.name','');
    const code =  hexgen(128)
    const username = _.get(req,'body.username');

    return questionaryApi.createAnonymQuestionary(name,code,username,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const createQuestionary = (req:any, res:any, next:any) => {
    const name = _.get(req,'body.name','');
    const code =  hexgen(128)
    const username = _.get(req,'body.username');
    const category = req.params.category;

    return questionaryApi.createQuestionary(category,name,code,username,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const getQuestionaryByCodeOrName = (req:any, res:any, next:any) => {
    const codeOrName = req.params.codeorname
    console.log(codeOrName)
    return questionaryApi.getQuestionaryByCodeOrName(codeOrName,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const getAllQuestionariesOfACategory = (req:any, res:any, next:any) => {
    const category = req.params.category;

    return questionaryApi.getAllQuestionariesOfACategory(category,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deleteQuestionary = (req:any, res:any, next:any) => {
    const codeOrName = _.get(req,'body.code',_.get(req,'body.name',''))
    const username = _.get(req,'body.username');
    return questionaryApi.deleteQuestionary(codeOrName,username,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const getQuestionaryByUserName = (req:any, res:any, next:any) => {
    const username = req.params.username;

    return questionaryApi.getQuestionaryByUserName(username,(err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}