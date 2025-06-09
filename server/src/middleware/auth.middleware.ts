import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';


export interface AuthenticatedRequest<
    P = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<P, ResBody, ReqBody, ReqQuery> {
    userId?: number;
}

const authMiddleware: RequestHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (req.url.startsWith("/auth")) {
        next();
        return;
    }

    if (!token) {
        res.status(401).send('Access Denied');
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

export default authMiddleware;
