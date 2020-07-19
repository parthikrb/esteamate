import express, { Request, Response } from 'express';
import { Squad } from '../models/squad';
import { requireAuth, NotFoundError } from '@parthikrb/common';

const router = express.Router();

router.get('/api/squads/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const squad = await Squad.findById(id)
            .populate('product_owner')
            .populate('scrum_master')
            .populate('scrum_team')
            .exec();

        if (!squad) {
            throw new NotFoundError();
        }

        res.send(squad);
    });

export { router as showSquadRouter };

