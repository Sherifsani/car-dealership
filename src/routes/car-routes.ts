import express from "express"
import {create, getAll, getOne, remove, update} from "../controllers/crud/car-controller"

const carRoutes = express.Router()

carRoutes.get("/get", getAll)
carRoutes.post("/post", create)
carRoutes.delete("/delete/:id", remove)
carRoutes.get("/get/:id", getOne)
carRoutes.put("/update/:id", update)

export default carRoutes