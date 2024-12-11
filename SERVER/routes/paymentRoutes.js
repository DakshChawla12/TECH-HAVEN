import express from 'express';
const router = express.Router();
import {checkout,paymentVerification} from '../controllers/paymentControllers.js';

router.post('/payment',checkout);
router.post('/verify',paymentVerification);

export default router;