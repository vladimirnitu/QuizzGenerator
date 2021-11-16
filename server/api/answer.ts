import * as answerLib from '../lib/answer'


export function createAnswer(questionaryName: any, userName:any,  answer: any,sex:any,groupage:any,occupation:any, urbanism:any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.createAnswer(questionaryName,userName, answer,sex,groupage,occupation, urbanism, next) })
}


export function getAllAnswersOfAQuestion(questionName: any,questionaryName:any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.getAllAnswersOfAQuestion(questionName,questionaryName, next) })
}

export function findASpecificAnswer(answerName: any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.findASpecificAnswer(answerName, next) })
}

export function deleteAnAnswer(questionName: any, next: any) {
    return Promise.resolve()
    .then(() => { return answerLib.deleteAnAnswer(questionName, next) })
}