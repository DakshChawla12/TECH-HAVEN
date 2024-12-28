import express from 'express';
const router = express.Router();
import { addProduct , getAllProductsPage  , deleteProduct , getFilteredProducts , getFourProducts , getById , editProduct, getAllProducts} from '../controllers/productController.js';
import {authenticateToken} from '../utils.js';
import upload from '../multerConfig.js';

router.route('/')
    .get(getAllProductsPage)
    .post(authenticateToken,upload.array('images', 5),addProduct)

router.route('/allProducts')
    .get(getAllProducts);
    
router.route('/featured')
    .get(getFourProducts)
    
router.route('/:prodID')
    .get(getById)
    .delete(authenticateToken,deleteProduct)
    .patch(authenticateToken,editProduct);

router.route('/filter')
    .post(getFilteredProducts)

export default router;