import express from 'express';
const router = express.Router();
import {getUserOrders,getAllOrders} from '../controllers/orderControllers.js';
import {authenticateToken} from '../utils.js';

router.route('/user-orders').get(authenticateToken,getUserOrders);
router.route('/allOrders').get(authenticateToken,getAllOrders);

export default router;