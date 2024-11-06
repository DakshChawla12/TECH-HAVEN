import express from 'express';
const router = express.Router();
import { addToCart , addToWishList , getCartItems , getWishList} from '../controllers/userControllers.js';

router.get('/cart',getCartItems);
router.get('/wishlist',getWishList);
router.post('/addToCart',addToCart);
router.post('/addToWishList',addToWishList);

export default router;