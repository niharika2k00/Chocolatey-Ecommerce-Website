
import express from 'express';
const router = express.Router();
import { AddOrderItems, GetOrderById, Update_OrderToPay, Update_OrderForDeliver, getAllMyOrders, getOrders } from "../Controllers/Order_Controller.js";
import { protect, ISAdmin } from "../Middleware/Auth_middleware.js";


router.route("/").post(protect, AddOrderItems).get(protect, ISAdmin, getOrders);
router.route("/myorders").get(protect, getAllMyOrders);
router.route("/:id").get(protect, GetOrderById);
router.route("/:id/pay").put(protect, Update_OrderToPay);
router.route("/:id/deliver").put(protect, ISAdmin, Update_OrderForDeliver);

export default router;







