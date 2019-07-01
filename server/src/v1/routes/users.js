import { Router } from 'express';
import { signUpValidator, loginValidator } from '../middlewares/inputValidators';
import { verifyNewUser, verifyExistingUser } from '../middlewares/verify';
import { createNewUser, authUser } from '../controllers/user';


const router = Router();

router.post('/', (req, res) => res.status(200).json('Hello World'));

router.post('/sign-up', signUpValidator, verifyNewUser, createNewUser);
router.post('/login', loginValidator, verifyExistingUser, authUser);


export default router;
