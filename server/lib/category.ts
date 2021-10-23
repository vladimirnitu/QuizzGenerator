import _ from "lodash"
import AnswerTable from "../models/Answer"
import CategoryTable from "../models/Category"
import QuestionaryTable from "../models/Questionary"
import QuestionsTable from "../models/Questions"
import UserTable from "../models/User"

export const createCategory = (username: string, name: string, next: any) => {
    let query = { UserName: { $eq: username } }
    return UserTable
        .findOne(query)
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                let categoryTable = new CategoryTable({ Name: name, UserName: username })
                categoryTable.save((err: any) => {
                    if (err)
                        next(err, null)
                    else
                        next(null, { Name: name, UserName: username })
                })
            }
            else {
                next({}, null);
                return {};
            }
        })

}


export const deleteCategory = (username: string, name: string, next: any) => {
    let query = { UserName: { $eq: username } }
    let deleteQuery = { Name: { $eq: name } }

    return UserTable
        .findOne(query)
        .then((docUser: any) => {
            if (!_.isNil(docUser)) {
                return CategoryTable
                    .deleteOne(deleteQuery)
                    .then((docCategory: any) => {
                        return QuestionaryTable
                            .deleteMany({ CategoryName: { $eq: name } })
                            .then((docQuestionary: any) => {
                                return QuestionsTable
                                    .deleteMany({ CategoryName: { $eq: name } })
                                    .then((docQuestions: any) => {
                                        return AnswerTable
                                            .deleteMany({ CategoryName: { $eq: name } })
                                            .then((docAnswere: any) => {
                                                return Promise.resolve(docAnswere)
                                                    .then((doc) => { next(null, "Category deleted") })
                                            })
                                            .catch((err: any) => next(err, null))
                                    })
                            })

                    })

            }
        })
}


export const findOneCategory = (name: string, next: any) => {
    let query = { Name: { $eq: name } }
    return CategoryTable
        .findOne(query)
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                next(null, doc);
                return doc;
            }
            else {
                next(null, {});
                return {};
            }
        })
}

export const browseCategories = (next: any) => {
    return CategoryTable.find({}).select('-__v')
        .then((doc: any) => { next(null, doc); return doc })

}