import Manager from '../models/Manager';
import {Request, Response} from "express";

export const createManager = async(req: Request, res: Response) => {
    try{
        const formBody = req.body
        if(!formBody) return res.status(400).json({
            success: false,
            message: "Invalid request body"
        })
        const createdManager = await Manager.create(formBody)
        res.status(201).json({
            success: true,
            data: createdManager,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

export const getAllManagers = async (req: Request, res: Response) => {
    try{
        const managers = await Manager.find()
        res.status(200).json({
            success: true,
            data: managers,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

export const getManagerById = async (req: Request, res: Response) => {
    try{
        const id = req.params.id
        const targetManager = await Manager.findById(id)
        if(!targetManager){
            res.status(404).json({
                success: false,
                message: "Manager not found"
            })
        }
        res.status(200).json({
            success: true,
            data: targetManager,
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

export const deleteManager = async (req: Request, res: Response) => {
    try{
        const managerId = req.params.id
        const targetManager = await Manager.findByIdAndDelete(managerId)
        if(!targetManager){
            res.status(404).json({
                success: false,
                message: "Manager not found"
            })
        }
        res.status(200).json({
            success: true,
            message: 'Manager Deleted Successfully',
            data: targetManager,
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}

export const updateManager = async (req: Request, res: Response) => {
    try{
        const managerId = req.params.id
        const targetManager = await Manager.findByIdAndUpdate(managerId, req.body, {new: true})
        if(!targetManager){
            res.status(404).json({
                success: false,
                message: "Manager not found"
            })
        }
        res.status(200).json({
            success: true,
            data: targetManager,
        })
    }catch (err) {
        console.log(err);
        res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
    }
}