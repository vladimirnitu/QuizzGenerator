import _ from 'lodash'
import * as categoryApi from '../api/category'
import * as helper from '../utils/helper'

export const createCategory = (req: any, res: any, next: any) => {
    const name = _.get(req, 'body.name', '')
    const username = _.get(req, 'body.username', '')
    return categoryApi.createCategory(username, name, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export function findOneCategory(req: any, res: any, next: any) {
    const name = req.params.Name
    return categoryApi.findOneCategory(name, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export function browseCategories(req: any, res: any, next: any) {
    return categoryApi.browseCategories((err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}

export const deleteCategory = (req: any, res: any, next: any) => {
    const name = _.get(req, 'body.name', '')
    const username = _.get(req, 'body.username', '')

    return categoryApi.deleteCategory(username, name, (err: any, data: any) => {
        helper.returnResponse(res, err, data, next)
    })
}
