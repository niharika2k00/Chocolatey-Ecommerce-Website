
import express from 'express';
const router = express.Router();
import { getproducts, getproductByID } from "../Controllers/product_controller.js";



router.route('/').get(getproducts) ;
router.route('/:id').get(getproductByID);

export default router;







