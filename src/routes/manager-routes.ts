import express from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/crud/manager-controller';
import authMiddleware from "../middlewares/auth-middleware";
import adminMiddleware from "../middlewares/admin-middleware";

const managerRoutes = express.Router();

managerRoutes.get("/get", authMiddleware, adminMiddleware, getAll)
managerRoutes.get("/get/:id",authMiddleware, adminMiddleware, getOne)
managerRoutes.post("/post", authMiddleware, adminMiddleware, create)
managerRoutes.put("/update/:id", authMiddleware, adminMiddleware, update)
managerRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, remove)

export default managerRoutes;
