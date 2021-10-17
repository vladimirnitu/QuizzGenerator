import { Router } from 'express';
import * as categoryMiddleware from '../middleware/category'
const router = Router();


const multer = require('multer')
var uploadEmpty = multer()

router.post('/category/create',uploadEmpty.none(), categoryMiddleware.createCategory)

router.get('/one/category/:Name', categoryMiddleware.findOneCategory)

router.get('/category/all', categoryMiddleware.browseCategories)

router.delete('/category/delete',uploadEmpty.none(), categoryMiddleware.deleteCategory)

export default router