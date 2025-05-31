import Car from '../../models/Cars';
import {generateCrudControllers} from "../../../utils/crudController";

export const {create, getAll, getOne, remove, update} = generateCrudControllers(Car);