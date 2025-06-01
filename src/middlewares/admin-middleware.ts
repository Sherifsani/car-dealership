import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.userInfo?.role !== 'manager') {
        return res.status(401).json({
            success: false,
            message: 'You are not authorized.',
        });
    }

    next();
};

export default adminMiddleware;
