import _ from 'lodash'
import * as userApi from '../api/user'
import * as helper from '../utils/helper'
var hexgen = require('hex-generator');
let generateUsername = require('friendly-username-generator');

export const createUserWithAlldetailsFromRegister = (req: any, res: any, next: any) => {
    const generateUser = generateUsername()
    const email = _.get(req, 'body.email', _.get(req, 'body.username', generateUser))
    const password = _.get(req, 'body.password', '')
    const username = _.get(req, 'body.username', _.get(req, 'body.email', generateUser))
    const name = _.get(req, 'body.name', '')
    const firstName = _.get(req, 'body.firstName', '')
    const sex = _.get(req, 'body.sex', '')
    const occupation = _.get(req, 'body.occupation', '')
    const urbanism = _.get(req, 'body.urbanism', '')
    const groupAge = _.get(req, 'body.groupAge', '')
    var hex = hexgen(128)
    const userData = {
        Email: email,
        Password: password,
        Name: name,
        FirstName: firstName,
        Sex: sex,
        UserName: username,
        GroupAge: groupAge,
        Occupation: occupation,
        Urbanism: urbanism,
        Code: hex
    }
    return userApi.createUserWithAlldetailsFromRegister(userData, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const loginUser = (req: any, res: any, next: any) => {
    const password = _.get(req, 'body.password', '')
    const email = _.get(req, 'body.email', '')
    const username = _.get(req, 'body.username', '')
    return userApi.loginUser(username, email, password, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })

}

export const getAllUsers = (req: any, res: any, next: any) => {
    return userApi.getAllUsers((err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const findOneUser = (req: any, res: any, next: any) => {
    const email = _.get(req, 'body.email', '')
    const username = _.get(req, 'body.username', '')
    return userApi.findOneUser(username, email, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}