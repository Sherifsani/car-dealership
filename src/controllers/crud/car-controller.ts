import Car from '../../models/Cars';
import {generateCrudControllers} from "../../../utils/crudController";
import {Request, Response} from "express"

export const { getAll, getOne, remove, update} = generateCrudControllers(Car);

export const createCar = async (req: Request, res: Response) => {
    try {
        const {
            carModel,
            price,
            year,
            manufacturer,
            categoryNames,
            availability,
            stock,
        } = req.body;

        const newCar = new Car({
            carModel,
            price,
            year,
            manufacturer,
            category: categoryNames, // Store category names directly
            availability,
            stock,
        });

        await newCar.save();

        res.status(201).json({ success: true, data: newCar });
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ success: false, message: "Failed to create car." });
    }
};
export const get = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const {
            category,           // string or comma-separated string
            minPrice,
            maxPrice,
            manufacturer,
            availability,
            year,
        } = req.query;

        const query: any = {};

        if (category) {
            const categoryArray = (category as string).split(',').map(cat => cat.trim());
            query.category = { $in: categoryArray };
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice as string);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
        }

        if (manufacturer) {
            query.manufacturer = { $regex: new RegExp(manufacturer as string, "i") };
        }

        if (availability !== undefined) {
            query.availability = availability === "true";
        }

        if (year) {
            query.year = parseInt(year as string);
        }

        const cars = await Car.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: cars,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err instanceof Error ? err.message : String(err),
        });
    }
};
