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
    console.log(codeOrName)
    return Promise.resolve()
        .then(() => { return questionaryLib.getQuestionaryByCodeOrName(codeOrName, next) })
}

export function getAllQuestionariesOfACategory(categoryName: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getAllQuestionariesOfACategory(categoryName, next) })
}

export function deleteQuestionary(questionaryNameOrCode: any, username: any, next: any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.deleteQuestionary(questionaryNameOrCode,username, next) })
}

export function getQuestionaryByUserName(username:any,next:any) {
    return Promise.resolve()
        .then(() => { return questionaryLib.getQuestionaryByUserName(username, next) })
}