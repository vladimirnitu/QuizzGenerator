import * as categoryLib from '../lib/category'


export function createCategory(username:string,name: any, next: any) {
    return Promise.resolve()
    .then(() => { return categoryLib.createCategory(username,name, next) })
}

export function findOneCategory(name: any, next: any) {
    return Promise.resolve()
    .then(() => { return categoryLib.findOneCategory(name, next) })
}

export function browseCategories(next: any) {
    return Promise.resolve()
    .then(() => { return categoryLib.browseCategories(next) })
}

export function deleteCategory(username:string,name: any,next: any) {
    return Promise.resolve()
    .then(() => { return categoryLib.deleteCategory(username,name, next) })
}