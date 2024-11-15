import express from 'express';
const router = express.Router();
import { addToCart , addToWishList , getCartItems , getWishList , deleteFromCart , updateQuantity , deleteFromWishlist , getLength} from '../controllers/userControllers.js';
import {authenticateToken} from '../utils.js';

router.get('/',authenticateToken,getLength)
router.get('/cart',authenticateToken,getCartItems);
router.delete('/cart/:prodID', authenticateToken, deleteFromCart);
router.post('/cart/updateQuantity',authenticateToken,updateQuantity);
router.post('/addToCart',authenticateToken,addToCart);
router.route('/wishlist')
    .get(authenticateToken,getWishList)
    .post(authenticateToken,addToWishList)
router.delete('/wishlist/:prodID',authenticateToken,deleteFromWishlist);

export default router;