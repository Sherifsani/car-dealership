import express from 'express';
import { create, getAll, getOne, remove, update } from '../controllers/crud/category-controller';

const categoryRoutes = express.Router();

categoryRoutes.get("/get", getAll);
categoryRoutes.get("/get/:id", getOne);
categoryRoutes.post("/post", create);
categoryRoutes.put("/update/:id", update);
categoryRoutes.delete("/delete/:id", remove);

export default categoryRoutes;
