import express from 'express';
import {register} from "../../controllers/auth/auth-controller";

const authRoutes = express.Router();

authRoutes.post("/register", register)


export default authRoutes;