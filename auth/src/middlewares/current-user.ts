import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    fullname: string;
    username: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    /***
     * validate the session cookie and
     * extract the user details from jwt and append it as currentUser in request body
     */

    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch (err) {
        console.error(err);
    }
    next();
}