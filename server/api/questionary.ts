import * as questionaryLib from '../lib/questionary'



export function createAnonymQuestionary(name: any, code: any, username: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.createAnonymQuestionary(name, code, username, next) })
}

export function createQuestionary(categoryName: any, name: any, code: any, username: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.createQuestionary(categoryName, name, code, username, next) })
}

export function getQuestionaryByCodeOrName(codeOrName: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getQuestionaryByCodeOrName(codeOrName, next) })
}

export function getAllQuestionariesOfACategory(categoryName: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getAllQuestionariesOfACategory(categoryName, next) })
}

export function deleteQuestionary(questionaryCode: any, username: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.deleteQuestionary(questionaryCode,username, next) })
}

export function getQuestionaryByUserName(username:any,next:any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getQuestionaryByUserName(username, next) })
}

export function getAllUniqueAnswers(questionaryNameOrCode: any,  next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getAllUniqueAnswers(questionaryNameOrCode, next) })
}

export function getStatistics(questionaryNameOrCode: any,next:any) {
    return Promise.resolve()
    .then(() => { return questionaryLib.getStatistics(questionaryNameOrCode, next) })
}