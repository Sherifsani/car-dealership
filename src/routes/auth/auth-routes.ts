import express from 'express';
import {register, login, changePassword} from "../../controllers/auth/auth-controller";

const authRoutes = express.Router();

authRoutes.post("/register", register)
authRoutes.post("/login", login)
authRoutes.post("/change-password", changePassword)


export default authRoutes;