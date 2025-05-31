import {Request, Response} from 'express';
import {Model} from 'mongoose';

export const generateCrudControllers = (model: Model<any>) => {
    return {
        create: async (req: Request, res: Response) => {
            try{
                const formBody = req.body
                if(!formBody) return res.status(400).json({
                    success: false,
                    message: "Invalid request body"
                })
                const createdResource = await model.create(formBody)
                res.status(201).json({
                    success: true,
                    data: createdResource,
                });
            }catch(err){
                console.log(err);
                res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
            }
        },
        getAll: async (req: Request, res: Response) => {
            try{
                const resources = await model.find()
                res.status(200).json({
                    success: true,
                    data: resources,
                });
            }catch(err){
                console.log(err);
                res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
            }
        },
        getOne: async (req: Request, res: Response) => {
            try{
                const id = req.params.id
                const targetResouce = await model.findById(id)
                if(!targetResouce){
                    res.status(404).json({
                        success: false,
                        message: "Resource not found"
                    })
                }
                res.status(200).json({
                    success: true,
                    data: targetResouce,
                })
            }catch (err) {
                console.log(err);
                res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
            }
        },
        remove: async (req: Request, res: Response) => {
            try{
                const resourceId = req.params.id
                const targetResource = await model.findByIdAndDelete(resourceId)
                if(!targetResource){
                    res.status(404).json({
                        success: false,
                        message: "Resource not found"
                    })
                }
                res.status(200).json({
                    success: true,
                    message: 'Resource Deleted Successfully',
                    data: targetResource,
                })
            }catch (err) {
                console.log(err);
                res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
            }
        },
        update: async (req: Request, res: Response) => {
            try{
                const resourceId = req.params.id
                const targetResource = await model.findByIdAndUpdate(resourceId, req.body, {new: true})
                if(!targetResource){
                    return res.status(404).json({
                        success: false,
                        message: "Resource not found"
                    })
                }
                res.status(200).json({
                    success: true,
                    data: targetResource,
                })
            }catch (err) {
                console.log(err);
                res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
            }
        },
    }
}
