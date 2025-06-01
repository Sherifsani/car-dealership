import jwt from "jsonwebtoken"
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
export const login = async (req: Request, res: Response) => {
    try{
        const {role, email, password} = req.body
        const Model = (role == "customer" ? Customer: Manager) as mongooseModel<any>
        const user = await Model.findOne({email})

        if(user){
            res.status(404).json({
                success: false,
                message:"user not found"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Password is incorrect"
            })
        }
        const accessToken = jwt.sign(
            {
                userId: user.id,
                email: email,
                role: role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        )
        return res.status(200).json({
            success: true,
            message:"user login is successful",
            accessToken
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}
export const changePassword = async(req: Request, res: Response) => {
    try{
        const { email, oldPassword, newPassword, role } = req.body
        if(!email || !oldPassword || !newPassword) {
            res.status(400).json({
                success: false,
                message: "please pass your email and  password"
            })
        }
        const Model = (role == "manager" ? Manager: Customer) as mongooseModel<any>
        const user = await Model.findOne({email})
        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isPasswordMatch){
            res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        user.password = hashedPassword
        await user.save()
        res.status(200).json({
            success: true,
            message: "password changed successfully",
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
             success: false,
             message: "Error changing password"
        })
    }
}
