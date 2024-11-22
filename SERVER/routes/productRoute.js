import express from 'express';
const router = express.Router();
import { addProduct , getAllProducts  , deleteProduct , getFilteredProducts , getFourProducts , getById , editProduct} from '../controllers/productController.js';

router.route('/')
    .get(getAllProducts)
    .post(addProduct)

    
router.route('/featured')
    .get(getFourProducts)
    
router.route('/:prodID')
    .get(getById)
    .delete(deleteProduct)
    .patch(editProduct);

router.route('/filter')
    .get(getFilteredProducts)

export default router;