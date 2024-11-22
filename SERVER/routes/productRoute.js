import express from 'express';
const router = express.Router();
import { addProduct , getAllProducts  , deleteProduct , getFilteredProducts , getFourProducts , getById} from '../controllers/productController.js';

router.route('/')
    .get(getAllProducts)
    .post(addProduct)

    
router.route('/featured')
    .get(getFourProducts)
    
router.route('/:prodID')
    .get(getById)
    .delete(deleteProduct)

router.route('/filter')
    .get(getFilteredProducts)

export default router;