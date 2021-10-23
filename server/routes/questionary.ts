import { Router } from 'express';
import * as questionaryMiddleware from '../middleware/questionary'

const router = Router();

router.post('/questionary/anonym/create', questionaryMiddleware.createAnonymQuestionary)

router.post('/questionary/create/:category', questionaryMiddleware.createQuestionary)

router.get('/questionary/:codeorname', questionaryMiddleware.getQuestionaryByCodeOrName)

router.delete('/questionary', questionaryMiddleware.deleteQuestionary)

router.get('/questionarycat/:category',questionaryMiddleware.getAllQuestionariesOfACategory)

export default router