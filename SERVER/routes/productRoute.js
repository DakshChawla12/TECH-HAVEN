import express from 'express';
const router = express.Router();
import { addProduct , getAllProducts  , deleteProduct , getFilteredProducts , getFourProducts , getById} from '../controllers/productController.js';

router.route('/')
    .get(getAllProducts)
    .post(addProduct)
    .delete(deleteProduct)

router.route('/:prodID').get(getById);

router.route('/featured')
    .get(getFourProducts)

router.route('/filter')
    .get(getFilteredProducts)

export default router;