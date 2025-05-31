import Category from '../../models/Category';
import {generateCrudControllers} from "../../../utils/crudController";

export const {create, getAll, getOne, remove, update} = generateCrudControllers(Category);
