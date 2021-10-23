import _ from "lodash"
import UserTable from "../models/User"

export const createUserWithAlldetailsFromRegister = (user: any, next: any) => {
    return Promise.resolve()
        .then(() => {
            let userTable = new UserTable(user)
            userTable.save((err: any) => {
                if (err)
                    next("Username or email already in use", null)
                else
                    next(null, user)
            })
        })
}

export const loginUser = (username: string, email: string, password: string, next: any) => {

    let query1 = { Email: { $eq: email }, Password: { $eq: password } }
    let query2 = { UserName: { $eq: username }, Password: { $eq: password } }
    return UserTable
        .findOne({ $or: [query1, query2] })
        .then((doc: any) => {
            if (!_.isNil(doc)) {
                next(null, { isAccessGranted: true, user: doc });
                return { isAccessGranted: true, user: doc };
            }
            else {
                next(null, { isAccessGranted: false, user: doc });
                return { isAccessGranted: false, user: doc };
            }
        })
}

export const getAllUsers = (next: any) => {
    return UserTable
        .find({})
        .select('-__v')
        .then((doc: any) => { next(null, doc); return doc })
}

export const findOneUser = (username: string, email: string, next: any) => {
    return UserTable
        .find({ $or: [{ Email: { $eq: email } }, { UserName: { $eq: username } }] })
        .cursor()
        .eachAsync((doc: any) => { next(null, doc); return doc })
}

