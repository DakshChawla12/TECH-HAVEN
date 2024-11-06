import express from 'express';
const router = express.Router();
import { login , signup } from '../controllers/authControllers.js';
import { loginValidation , signUpValidation } from '../middlewares/authValidation.js';

router.post('/login',loginValidation,login);
router.post('/signup',signUpValidation,signup);

export default router;
