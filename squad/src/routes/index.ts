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

        const squads = await Squad.find({})
            .populate('product_owner')
            .populate('scrum_master')
            .populate('scrum_team')
            .exec();
        res.status(200).send(squads);
    })

export { router as indexSquadRouter };