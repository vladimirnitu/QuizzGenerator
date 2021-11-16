import { Router } from 'express';
import * as answerMiddleware from '../middleware/answer'
const router = Router();



router.post('/answer/create', answerMiddleware.createAnswer)

router.get('/answer/:questionaryCode/:questionID', answerMiddleware.getAllAnswersOfAQuestion)

// router.get('/one/answer', answerMiddleware.findASpecificAnswer)

// router.delete('/answer/delete', answerMiddleware.deleteAnAnswer)

export default router