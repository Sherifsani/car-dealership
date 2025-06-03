import { Request, Response } from "express";
import Car from "../../models/Cars";
import Customer from "../../models/Customer";
import Purchase from "../../models/Purchase";
import mongoose from "mongoose";

export const purchaseCar = async (req: Request, res: Response) => {
    const { customerId, carId } = req.body;

    try {
        const car = await Car.findById(carId);
        if (!car || car.stock < 1) {
            return res.status(400).json({ success: false, message: "Car not available" });
        }

        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        const purchase = new Purchase({
            customer: customer._id,
            car: car._id,
            price: car.price,
        });

        await purchase.save();
        car.stock -= 1;
        await car.save();

        return res.status(201).json({
            success: true,
            message: "Car purchased successfully",
            purchase,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing the purchase",
        });
    }
};
