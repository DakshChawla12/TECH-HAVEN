import express from 'express';
const router = express.Router();
import { addProduct , getAllProducts  , deleteProduct , getFilteredProducts} from '../controllers/productController.js';

router.route('/')
    .get(getAllProducts)
    .post(addProduct)
    .delete(deleteProduct)

router.route('/filter')
    .get(getFilteredProducts)

export default router;