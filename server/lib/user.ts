import _ from "lodash"
import UserTable from "../models/User"

export const createUserWithAlldetailsFromRegister = (user: any, next: any) => {

    let userTable = new UserTable(user)
    userTable.save((err: any) => {
        if (err)
            next(err, null)
        else
            next(null, 'User Created')
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
