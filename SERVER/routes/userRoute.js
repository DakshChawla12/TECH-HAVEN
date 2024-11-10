import express from 'express';
const router = express.Router();
import { addToCart , addToWishList , getCartItems , getWishList} from '../controllers/userControllers.js';
import {authenticateToken} from '../utils.js';

router.get('/cart',authenticateToken,getCartItems);
router.get('/wishlist',getWishList);
router.post('/addToCart',authenticateToken,addToCart);
router.post('/addToWishList',addToWishList);

export default router;