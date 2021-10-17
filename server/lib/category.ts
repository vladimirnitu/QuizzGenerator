import _ from "lodash"
import CategoryTable from "../models/Category"
import UserTable from "../models/User"

export const createCategory = (username: string, name: string, next: any) => {
    let query = { UserName: { $eq: username } }
    console.log(username)
    console.log(name)
    return UserTable
        .findOne(query)
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                let categoryTable = new CategoryTable({ Name: name, UserName: username })
                categoryTable.save((err: any) => {
                    if (err)
                        next(err, null)
                    else
                        next(null, 'Category created')
                })
                .then()
            }
            else {
                console.log("aici")
                next({}, null);
                return {};
            }
        })
        
}


export const deleteCategory = (username: string, name: string, next: any) => {
    let query = { UserName: { $eq: username } }
    let deleteQuery = { Name: {$eq: name}}

    return UserTable
        .findOne(query)
        .then((doc: any) => {
            if (!_.isNil(doc)) {
              return CategoryTable
              .deleteOne(deleteQuery)
                .then((doc: any) => {
                    return Promise.resolve(doc)
                        .then((doc) => { next(null, "Category deleted") })
                })
                .catch((err:any) => next(err, null) )
            }
            else {
                next("User not found", null);
                return {};
            }
        })
}


export const findOneCategory = (name: string, next: any) => {
    console.log(name)
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
        .then((doc: any) => {console.log(doc); next(null, doc); return doc })

}