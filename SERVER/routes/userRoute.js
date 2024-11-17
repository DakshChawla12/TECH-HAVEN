import express from 'express';
const router = express.Router();
import { addToCart , addToWishList , getCartItems , getWishList , deleteFromCart , updateQuantity , deleteFromWishlist , getLength , getUserDetails , changeUserDetails} from '../controllers/userControllers.js';
import {authenticateToken} from '../utils.js';

router.route('/profile')
    .get(authenticateToken,getUserDetails)
    .post(authenticateToken,changeUserDetails);
router.get('/',authenticateToken,getLength)
router.get('/cart',authenticateToken,getCartItems);
router.post('/cart/updateQuantity',authenticateToken,updateQuantity);
router.delete('/cart/:prodID', authenticateToken, deleteFromCart);
router.post('/addToCart',authenticateToken,addToCart);
router.route('/wishlist')
    .get(authenticateToken,getWishList)
    .post(authenticateToken,addToWishList)
router.delete('/wishlist/:prodID',authenticateToken,deleteFromWishlist);

export default router;