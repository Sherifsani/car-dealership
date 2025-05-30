import express from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/customer-controller';

const customerRoutes = express.Router();

customerRoutes.get("/get", getAll);
customerRoutes.get("/get/:id", getOne);
customerRoutes.post("/post", create);
customerRoutes.put("/update/:id", update);
customerRoutes.delete("/delete/:id", remove);

export default customerRoutes;
