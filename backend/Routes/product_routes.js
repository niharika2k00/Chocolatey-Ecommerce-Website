

import express from 'express';
const router = express.Router();
import { protect, ISAdmin } from "../Middleware/Auth_middleware.js";
import { getproducts, getproductByID, deleteProductByID, createProduct, updatedProduct } from "../Controllers/product_controller.js";



router.route('/').get(getproducts).post(protect, ISAdmin, createProduct);
router
    .route('/:id')
    .get(getproductByID)
    .delete(protect, ISAdmin, deleteProductByID)
    .put(protect, ISAdmin, updatedProduct);


export default router;







