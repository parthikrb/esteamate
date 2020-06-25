import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    /***
     * validate the request body and throw error 
     * if request body doesn't match body constraints
     * for each request
     */

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    next();
}