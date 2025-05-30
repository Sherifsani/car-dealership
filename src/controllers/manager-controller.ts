import Manager from '../models/Manager';
import {generateCrudControllers} from "../../utils/crudController";

export const {create, getAll, getOne, remove, update} = generateCrudControllers(Manager);
