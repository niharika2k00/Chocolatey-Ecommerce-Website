
import express from 'express';
const router = express.Router();
import { AddOrderItems } from "../Controllers/Order_Controller.js";
import { protect } from "../Middleware/Auth_middleware.js";


router.route("/").post(protect, AddOrderItems);

export default router;







