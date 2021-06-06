
import express from 'express';
const router = express.Router();
import { userAuth, userRegister, getuserProfile, UpdateuserProfile, getAllUsers, deleteUser } from "../Controllers/user_controller.js";
import { protect, ISAdmin } from "../Middleware/Auth_middleware.js";




router.route("/").post(userRegister).get(protect, ISAdmin, getAllUsers);           // 2 routes are there in '/'
router.route("/login").post(userAuth);
router.route('/profile').get(protect, getuserProfile).put(protect, UpdateuserProfile);
router.route('/:id').delete(protect, ISAdmin, deleteUser);

export default router;







