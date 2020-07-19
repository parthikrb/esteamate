import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { requireAuth } from '@parthikrb/common';

const router = express.Router();

router.get('/api/users', requireAuth,
    async (req: Request, res: Response) => {
        const users = await User.find({}).exec();
        res.status(200).send(users);
    });

export { router as showUserRouter };