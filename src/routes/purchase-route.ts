import express from "express"
import {purchaseCar} from "../controllers/transaction/purchase-car";
import authMiddleware from "../middlewares/auth-middleware";

const purchaseRoute = express.Router()

purchaseRoute.post("/", authMiddleware, purchaseCar)

export default purchaseRoute;