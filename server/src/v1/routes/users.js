import { Router } from 'express';
import { signUpValidator } from '../middlewares/inputValidators';
import { verifyNewUser } from '../middlewares/verify';
import { createNewUser } from '../controllers/user';

const router = Router();

router.post('/', signUpValidator, verifyNewUser, createNewUser);

export default router;
