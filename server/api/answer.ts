import * as answerLib from '../lib/answer'


export function createAnswer(questionaryName: any,  answer: any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.createAnswer(questionaryName, answer, next) })
}


export function getAllAnswersOfAQuestion(questionName: any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.getAllAnswersOfAQuestion(questionName, next) })
}

export function findASpecificAnswer(answerName: any, next: any) {
    return Promise.resolve()
        .then(() => { return answerLib.findASpecificAnswer(answerName, next) })
}

export function deleteAnAnswer(questionName: any, next: any) {
    return Promise.resolve()
    .then(() => { return answerLib.deleteAnAnswer(questionName, next) })
}