import express from 'express';
const router = express.Router();
import {checkout,paymentVerification} from '../controllers/paymentControllers.js';
import {authenticateToken} from '../utils.js';

router.route('/checkout')
    .post(checkout);

router.route('/paymentVerification')
    .post(authenticateToken,paymentVerification);

export default router; 