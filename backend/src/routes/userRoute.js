import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controller/userController.js";

const router = Router();

//fetch all users
router.get("/", protectRoute, getAllUsers);
//todo: get messages between users
export default router;
