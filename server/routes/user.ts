import { Router } from 'express';
import * as userMiddleware from '../middleware/user'
const router = Router();
const multer = require('multer')
var uploadEmpty = multer()
router.post('/register/user',uploadEmpty.none(), userMiddleware.createUserWithAlldetailsFromRegister)

router.post('/login/user',uploadEmpty.none(), userMiddleware.loginUser)

export default router