import express from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/crud/category-controller';
import authMiddleware from "../middlewares/auth-middleware";
import adminMiddleware from "../middlewares/admin-middleware";

const categoryRoutes = express.Router();

categoryRoutes.get("/get", getAll);
categoryRoutes.get("/get/:id", getOne);
categoryRoutes.post("/post", authMiddleware, adminMiddleware, create);
categoryRoutes.put("/update/:id", authMiddleware, adminMiddleware, update);
categoryRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, remove);

export default categoryRoutes;
