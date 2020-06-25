import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password'

const router = express.Router();

router.post('/api/users/signin',
    [
        body('username').isString().withMessage('Username is required'),
        body('password').trim().notEmpty().withMessage('Password is required')
    ]
    , async (req: Request, res: Response) => {

        const { username, password } = req.body;
        const existingUser = await User.findOne({ username }).exec();

        if (!existingUser) {
            throw new BadRequestError('Invalid username');
        }

        const validPassword = await Password.comparePassword(existingUser.password, password);

        if (!validPassword) {
            throw new BadRequestError('Invalid password');
        }

        const userJWT = jwt.sign({
            id: existingUser.id,
            fullname: `${existingUser.firstname} ${existingUser.lastname}`,
            username: existingUser.username,
            email: existingUser.email
        }, process.env.JWT_KEY!)

        req.session = {
            jwt: userJWT
        };

        res.status(200).send(existingUser);
    })

export { router as SigninRouter };