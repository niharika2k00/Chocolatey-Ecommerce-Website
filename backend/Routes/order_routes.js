
import express from 'express';
const router = express.Router();
import { AddOrderItems, GetOrderById } from "../Controllers/Order_Controller.js";
import { protect } from "../Middleware/Auth_middleware.js";


router.route("/").post(protect, AddOrderItems);
router.route("/:id").get(protect, GetOrderById);

export default router;







