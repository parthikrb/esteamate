import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('firstname').isString().withMessage('Firstname is required'),
        body('lastname').isString().withMessage('Lastname is required'),
        body('username').isString().withMessage('Username is required'),
        body('password').trim().isLength({ min: 3, max: 16 }).withMessage('Password must be between 3 and 16 characters'),
        body('email').isEmail().withMessage('Email is required'),
        body('role').isString().withMessage('Role is required'),
        body('isAdmin').isBoolean().withMessage('IsAdmin is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { firstname, lastname, username, password, email, role, isAdmin } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('User already exists');
        }

        const user = User.build({ firstname, lastname, username, password, email, role, isAdmin });
        await user.save();

        res.status(201).send(user);
    })

export { router as SignupRouter };