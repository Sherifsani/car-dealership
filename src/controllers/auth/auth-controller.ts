import jsonwebtoken from "jsonwebtoken"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import {Model as mongooseModel} from "mongoose";
import Customer from "../../models/Customer"
import Manager from "../../models/Manager";

export const register = async (req: Request, res: Response) => {
    try{
        const formBody = req.body
        if (!formBody) return res.status(400).json({
            success: false,
            message: "Invalid request body"
        });

        const Model = (formBody.role == "customer" ? Customer: Manager) as mongooseModel<any>
        const existingUser = await Model.findOne({email: formBody.email}).exec()
        if(existingUser){
            return res.status(400).json({
                success: false,
                error: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(formBody.password, salt)

        const newUser = new Model({
            ...formBody,
            password: hashedPassword,
        })

        const result = await newUser.save()
        if(result){
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: result,
            })
        }else{
            res.status(500).json({
                success: false,
                error: "Error creating user"
            })
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}
export const login = async (req: Request, res: Response) => {}
