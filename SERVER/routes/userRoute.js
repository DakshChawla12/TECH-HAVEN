import express from 'express';
const router = express.Router();
import { addToCart , addToWishList , getCartItems , getWishList , deleteFromCart , updateQuantity} from '../controllers/userControllers.js';
import {authenticateToken} from '../utils.js';

router.get('/cart',authenticateToken,getCartItems);
router.delete('/cart/:prodID', authenticateToken, deleteFromCart);
router.post('/cart/updateQuantity',authenticateToken,updateQuantity);
router.get('/wishlist',getWishList);
router.post('/addToCart',authenticateToken,addToCart);
router.post('/addToWishList',addToWishList);

export default router;