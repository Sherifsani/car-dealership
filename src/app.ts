import {configDotenv} from "dotenv";
import express from 'express'
import connectToDatabase from "../database/db";

configDotenv()

const app = express()
const port = process.env.port || 3000

connectToDatabase()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
