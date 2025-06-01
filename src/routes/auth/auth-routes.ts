import express from 'express';
import {register, login, changePassword} from "../../controllers/auth/auth-controller";
import authMiddleware from "../../middlewares/auth-middleware";

const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post("/change-password", authMiddleware, changePassword)


export default authRoutes;