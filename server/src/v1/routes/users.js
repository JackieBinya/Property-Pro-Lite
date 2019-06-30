import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => res.status(200).json('Hello World'));

export default router;
