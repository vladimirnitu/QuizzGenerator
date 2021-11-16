import { Router } from 'express';
import * as questionaryMiddleware from '../middleware/questionary'

const router = Router();

router.post('/questionary/anonym/create', questionaryMiddleware.createAnonymQuestionary)

router.post('/questionary/create/:category', questionaryMiddleware.createQuestionary)

router.get('/questionary/:codeorname', questionaryMiddleware.getQuestionaryByCodeOrName)

router.delete('/questionary/:username/:code', questionaryMiddleware.deleteQuestionary)

router.get('/questionarycat/:category',questionaryMiddleware.getAllQuestionariesOfACategory)

router.get('/questionaries/:username', questionaryMiddleware.getQuestionaryByUserName)

router.get('/questionary/answer/unique', questionaryMiddleware.getAllUniqueAnswers)

router.get('/questionary/get/statistics', questionaryMiddleware.getStatistics)
export default router