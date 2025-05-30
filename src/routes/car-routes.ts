import express from "express"
import {getAllCars, addCar, deleteCar, getCarById, updateCar} from "../controllers/car-controller"

const carRoutes = express.Router()

carRoutes.get("/", getAllCars)
carRoutes.post("/post", addCar)
carRoutes.delete("/delete/:id", deleteCar)
carRoutes.get("/:id", getCarById)
carRoutes.put("/update/:id", updateCar)

export default carRoutes