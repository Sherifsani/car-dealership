import Car from '../models/Cars';
import {Request, Response} from "express";

export const addCar = async (req: Request, res: Response) => {
    try{
        const formBody = req.body
        if(!formBody) return res.status(400).json({
            success: false,
            message: "Invalid request body"
        })
        const createdCar = await Car.create(formBody)
        res.status(201).json({
            success: true,
            data: createdCar,
        });
    }catch(err){

    }
}

export const getAllCars = async (req: Request, res: Response) => {
    try{
        const cars = await Car.find()
        res.status(200).json({
            success: true,
            data: cars,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    try{
        const carId = req.params.id
        const targetCar = await Car.findByIdAndDelete(carId)
        if(!targetCar){
            res.status(404).json({
                success: false,
                message: "Car not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'Car Deleted Successfully',
            data: targetCar,
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

// export default { getAllCars, addCar };