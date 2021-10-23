import * as questionsLib from '../lib/questions'



export function createQuestion (questionaryNameOrCode:any, question:any, next:any) {
    return Promise.resolve()
        .then(() => { return questionsLib.createQuestion(questionaryNameOrCode,question,next) })
}

export function findOneQuestion (questionName: string, next: any) {
    return Promise.resolve()
        .then(() => { return questionsLib.findOneQuestion(questionName,next) })
}

export function findAllQuestionOfAQuestionary (questionaryNameOrCode: string, next: any) {
    return Promise.resolve()
        .then(() => { return questionsLib.findAllQuestionOfAQuestionary(questionaryNameOrCode,next) })
}

export function deleteQuestion (questionName: string, next: any) {
    return Promise.resolve()
        .then(() => { return questionsLib.deleteQuestion(questionName,next) })
}
