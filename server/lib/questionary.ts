import _ from "lodash"
import CategoryTable from "../models/Category"
import QuestionaryTable from "../models/Questionary"
import UserTable from "../models/User"
import AnswerTable from "../models/Answer"
import QuestionsTable from "../models/Questions"
export const createAnonymQuestionary = (name: any, code: any, username: any, next: any) => {
    return UserTable
        .findOne({ UserName: { $eq: username } })
        .then((docUser: any) => {
            if (!_.isNil(docUser)) {
                let questionaryTable = new QuestionaryTable({ Name: name, Code: code, UserName: docUser._id })
                questionaryTable.save((err: any) => {
                    if (err)
                        next("Duplicated Questionary", null)
                    else
                        next(null, { Name: name, Code: code, UserName: username })
                })
            }
            else {
                next('No such User', null);
                return {};
            }
        })
}

export const getQuestionaryByUserName = (username: any, next: any) => {
    return QuestionaryTable
        .find({UserName: { $eq: username }})
        .then((doc: any) => {  
            if(_.isEmpty(doc) || doc === undefined)
            next(null,[]);
            else
            { next(null,doc)
              return doc }
            })
}
export const createQuestionary = (categoryName: any, name: any, code: any, next: any) => {
    return CategoryTable
        .findOne({ Name: { $eq: categoryName } })
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                let questionaryTable = new QuestionaryTable({ Category: doc._id, CategoryName: categoryName, Name: name, Code: code })
                questionaryTable.save((err: any) => {
                    if (err)
                        next("Duplicated Questionary", null)
                    else
                        next(null, { Category: doc._id, CategoryName: categoryName, Name: name, Code: code })
                })

            }
            else {

                next('No such Category', null);
                return {};
            }
        })
}
export const getQuestionaryByCodeOrName = (codeOrName: any, next: any) => {

    let query1 = { Code: { $eq: codeOrName } }
    let query2 = { Name: { $eq: codeOrName } }
    return QuestionaryTable
        .findOne({ $or: [query1, query2] })
        .then((doc: any) => {
            console.log(doc)
            if (_.isEmpty(doc) || doc === undefined)
                next('No such Category', null);
            else {
                next(null, doc)
                return doc
            }
        })
}


export const getAllQuestionariesOfACategory = (categoryName: any, next: any) => {

    return CategoryTable
        .findOne({ Name: { $eq: categoryName } })
        .then((doc: any) => {
            if (!_.isNil(doc)) {

                return QuestionaryTable
                    .find({ CategoryName: { $eq: categoryName } })
                    .then((doc: any) => { next(null, doc); return doc })

            }
            else {

                next('No such Category', null);
                return {};
            }
        })
}


export const deleteQuestionary = (questionaryCode: any, username: any, next: any) => {
    let query = { UserName: { $eq: username } }
    let deleteQuery1 = { Code: { $eq: questionaryCode } }
    let deleteQuery2 = { QuestionaryCode: { $eq: questionaryCode } }
    return UserTable
        .findOne(query)
        .then((docUser: any) => {
            if (!_.isNil(docUser)) {
                return QuestionaryTable
                    .deleteMany(deleteQuery1)
                    .then((docQuestionary: any) => {
                        return QuestionsTable
                            .deleteMany(deleteQuery2)
                            .then((docQuestions: any) => {
                                return AnswerTable
                                    .deleteMany(deleteQuery2)
                                    .then((docAnswere: any) => {
                                        return Promise.resolve(docAnswere)
                                            .then((doc) => { next(null, { response: "Questionary deleted" }) })
                                    })
                                    .catch((err: any) => next(err, null))
                            })
                    })
            }
        })
}

export const getAllUniqueAnswers = (questionaryNameOrCode: any, next: any) => {
    console.log(questionaryNameOrCode)
    let deleteQuery1 = { QuestionaryName: { $eq: questionaryNameOrCode } }
    let deleteQuery2 = { QuestionaryCode: { $eq: questionaryNameOrCode } }
    console.log("aici")
   
    return AnswerTable
        // .find({ $or: [deleteQuery1, deleteQuery2] })
        .distinct('UserName',{ $or: [deleteQuery1, deleteQuery2] })
        .then((res: any) => { console.log(res)
            if (!_.isNil(res) && !_.isEmpty(res)){
                next(null,JSON.stringify(res.length))
            return res.length;}
            else
            next("No answer to this questionary",null)
            return 0
        })
        .catch((err:any) => next(err,null))
}