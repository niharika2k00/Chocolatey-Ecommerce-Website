
import express from 'express';
const router = express.Router();
import { userAuth, userRegister, getuserProfile } from "../Controllers/user_controller.js";
import { protect } from "../Middleware/Auth_middleware.js";


router.route("/").post(userRegister);
router.route("/login").post(userAuth);
router.route('/profile').get(protect, getuserProfile);

export default router;







