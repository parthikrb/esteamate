import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest, natsWrapper } from '@parthikrb/common';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';

const router = express.Router();

router.post('/api/users/signup',
    [
        body('firstname').isString().withMessage('Firstname is required'),
        body('lastname').isString().withMessage('Lastname is required'),
        body('username').isString().withMessage('Username is required'),
        body('password').trim().isLength({ min: 3, max: 16 }).withMessage('Password must be between 3 and 16 characters'),
        body('email').isEmail().withMessage('Email is required'),
        body('role').isString().withMessage('Role is required'),
        body('isAdmin').isBoolean().withMessage('IsAdmin is required'),
        body('capacity_reserve').isNumeric().withMessage('CapacityReserve is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('User already exists');
        }

        const user = User.build(req.body);
        await user.save();

        await new UserCreatedPublisher(natsWrapper.client).publish({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
            isAdmin: user.isAdmin,
            role: user.role,
            capacity_reserve: user.capacity_reserve
        });

        res.status(201).send(user);
    });

export { router as SignupRouter };