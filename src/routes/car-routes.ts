import express from "express"
import {getAllCars, addCar, deleteCar} from "../controllers/car-controller"

const carRoutes = express.Router()

carRoutes.get("/", getAllCars)
carRoutes.post("/post", addCar)
carRoutes.delete("/delete/:id", deleteCar)

export default carRoutes