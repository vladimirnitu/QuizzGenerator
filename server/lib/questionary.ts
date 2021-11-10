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
                next({}, null);
                return {};
            }
        })
}

export const getQuestionaryByUserName= (username: any, next: any) => {  
    return QuestionaryTable
        .find({UserName: { $eq: username }})
        .then((doc: any) => {  
            if(_.isEmpty(doc) || doc === undefined)
            next({},null);
            else
            { next(null,doc)
              return doc }
            })
}
export const createQuestionary = (categoryName: any, name: any, code: any, username: any, next: any) => {
    return UserTable
        .findOne({ UserName: { $eq: username } })
        .then((docUser: any) => {
            if (!_.isNil(docUser)) {
                return CategoryTable
                    .findOne({ Name: { $eq: categoryName } })
                    .then((doc: any) => {
                        if (!_.isNil(doc)) {
                            let questionaryTable = new QuestionaryTable({ Category: doc._id, CategoryName: categoryName, Name: name, Code: code, UserName: username })
                            questionaryTable.save((err: any) => {
                                if (err)
                                    next("Duplicated Questionary", null)
                                else
                                    next(null, { Category: doc._id, CategoryName: categoryName, Name: name, Code: code, UserName: username })
                            })

                        }
                        else {

                            next({}, null);
                            return {};
                        }
                    })
            }

            else {
                next({}, null);
                return {}
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
            if(_.isEmpty(doc) || doc === undefined)
            next({},null);
            else
            { next(null,doc)
              return doc }})
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

                next({}, null);
                return {};
            }
        })
}


export const deleteQuestionary = (questionaryNameOrCode: any, username: any, next: any) => {
    let query = { UserName: { $eq: username } }
    let deleteQuery1 = { Name: { $eq: questionaryNameOrCode } }
    let deleteQuery2 = { Code: { $eq: questionaryNameOrCode } }
    let deleteQuery3 = { QuestionaryName: { $eq: questionaryNameOrCode } }
    let deleteQuery4 = { QuestionaryCode: { $eq: questionaryNameOrCode } }
    return UserTable
        .findOne(query)
        .then((docUser: any) => {
            if (!_.isNil(docUser)) {
                return QuestionaryTable
                    .deleteMany({ $or: [deleteQuery1, deleteQuery2] })
                    .then((docQuestionary: any) => {
                        return QuestionsTable
                            .deleteMany({ $or: [deleteQuery3, deleteQuery4] })
                            .then((docQuestions: any) => {
                                return AnswerTable
                                    .deleteMany({ $or: [deleteQuery3, deleteQuery4] })
                                    .then((docAnswere: any) => {
                                        return Promise.resolve(docAnswere)
                                            .then((doc) => { next(null, "Questionary deleted") })
                                    })
                                    .catch((err: any) => next(err, null))
                            })
                    })
            }
        })
}