import express from 'express';
const router = express.Router();
import {placeOrder} from '../controllers/orderControllers.js';

router.post('/placeOrder',placeOrder);

export default router;