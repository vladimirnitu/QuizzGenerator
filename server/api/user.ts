import * as userLib from '../lib/user'



export function createUserWithAlldetailsFromRegister(user: any, next: any) {
    return Promise.resolve()
    .then(() => { return userLib.createUserWithAlldetailsFromRegister(user, next) })
}

export function loginUser(username: any,email: any, password:any, next: any) {
    return Promise.resolve()
    .then(() => { return userLib.loginUser(username,email,password, next) })
}
 