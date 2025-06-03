import express from 'express';
import { getAll, getOne, remove, update } from '../controllers/crud/customer-controller';
import adminMiddleware from "../middlewares/admin-middleware";
import authMiddleware from "../middlewares/auth-middleware";

const customerRoutes = express.Router();

customerRoutes.get("/get", authMiddleware, adminMiddleware, getAll);
customerRoutes.get("/get/:id", authMiddleware, adminMiddleware, getOne);
customerRoutes.put("/update/:id", authMiddleware, adminMiddleware, update);
customerRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, remove);

export default customerRoutes;
