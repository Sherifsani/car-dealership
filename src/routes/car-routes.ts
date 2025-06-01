import express from "express"
import {create, getAll, getOne, remove, update} from "../controllers/crud/car-controller"
import authMiddleware from "../middlewares/auth-middleware";
import adminMiddleware from "../middlewares/admin-middleware";

const carRoutes = express.Router()

carRoutes.get("/get", getAll)
carRoutes.get("/get/:id", getOne)
carRoutes.post("/post", authMiddleware, adminMiddleware, create)
carRoutes.delete("/delete/:id", authMiddleware, adminMiddleware, remove)
carRoutes.put("/update/:id", authMiddleware, adminMiddleware, update)

export default carRoutes