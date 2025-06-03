import {configDotenv} from "dotenv";
import express from 'express'

import connectToDatabase from "./database/db";
import carRoutes from "./routes/car-routes";
import managerRoutes from "./routes/manager-routes";
import customerRoutes from "./routes/customer-routes";
import authRoutes from "./routes/auth/auth-routes";

configDotenv()

const app = express()
const port = process.env.port || 3000

connectToDatabase()

app.use(express.json())
app.use("/api/cars", carRoutes)
app.use("/api/managers", managerRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/auth", authRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
