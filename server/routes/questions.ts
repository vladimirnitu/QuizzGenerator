import { Router } from 'express';
import * as questionsMiddleware from '../middleware/questions'

const router = Router();


router.post('/questions/create/:codeorname', questionsMiddleware.createQuestion)

router.get('/questions/:codeorname', questionsMiddleware.findAllQuestionOfAQuestionary)

router.delete('/question/', questionsMiddleware.deleteQuestion)

router.get('/oneQuestion/',questionsMiddleware.findOneQuestion)

export default router