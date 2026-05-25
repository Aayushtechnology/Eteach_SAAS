import express from "express";
import AuthController from "../../../controller/globals/auth/authController.js";
const router = express.Router();
router.route("/register").post(AuthController.registerUser);
export default router;
