import express from 'express';
const router = express.Router();
import { addProduct , getAllProducts  , deleteProduct , getFilteredProducts , getFourProducts , getById , editProduct} from '../controllers/productController.js';
import {authenticateToken} from '../utils.js';
import upload from '../multerConfig.js';

router.route('/')
    .get(getAllProducts)
    .post(authenticateToken,upload.array('images', 5),addProduct)

    
router.route('/featured')
    .get(getFourProducts)
    
router.route('/:prodID')
    .get(getById)
    .delete(authenticateToken,deleteProduct)
    .patch(authenticateToken,editProduct);

router.route('/filter')
    .get(getFilteredProducts)

export default router;