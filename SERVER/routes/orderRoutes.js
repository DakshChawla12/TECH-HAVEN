import express from 'express';
const router = express.Router();
import {getUserOrders,getAllOrders,changeOrderStatus} from '../controllers/orderControllers.js';
import {authenticateToken} from '../utils.js';

router.route('/user-orders').get(authenticateToken,getUserOrders);
router.route('/')
    .get(authenticateToken,getAllOrders)
    
router.route('/:orderID')
    .patch(authenticateToken,changeOrderStatus);

export default router;