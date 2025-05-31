import express from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/crud/manager-controller';

const managerRoutes = express.Router();

managerRoutes.get("/get", getAll)
managerRoutes.get("/get/:id", getOne)
managerRoutes.post("/post", create)
managerRoutes.put("/update/:id", update)
managerRoutes.delete("/delete/:id", remove)

export default managerRoutes;
