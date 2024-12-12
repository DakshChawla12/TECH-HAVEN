import express from 'express';
const router = express.Router();
import { authenticateToken } from '../utils.js';
import { addReview } from '../controllers/reviewControllers.js';

router.route('/:prodId')
    .post(authenticateToken,addReview);

export default router;