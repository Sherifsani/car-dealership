import express from 'express';
import {  updateManager, deleteManager, getAllManagers, getManagerById, createManager } from '../controllers/manager-controller';

const managerRoutes = express.Router();

managerRoutes.get("/get", getAllManagers)
managerRoutes.get("/get/:id", getManagerById)
managerRoutes.post("/post", createManager)
managerRoutes.put("/update/:id", updateManager)
managerRoutes.delete("/delete/:id", deleteManager)

export default managerRoutes;