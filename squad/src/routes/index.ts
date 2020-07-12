import express, { Request, Response } from 'express';
import { NotAuthorizedError, requireAuth } from '@parthikrb/common';
import { Squad } from '../models/squad';


const router = express.Router();

router.get('/api/squads', requireAuth,
    async (req: Request, res: Response) => {

        const { isAdmin } = req.currentUser!;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const squads = await Squad.find({}).exec();
        res.status(200).send(squads);
    })

export { router as indexSquadRouter };