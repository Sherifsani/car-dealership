import Customer from '../../models/Customer';
import {generateCrudControllers} from "../../../utils/crudController";

export const { getAll, getOne, remove, update} = generateCrudControllers(Customer);
