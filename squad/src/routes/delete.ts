import express, { Request, Response } from 'express';
import { NotAuthorizedError, requireAuth, BadRequestError } from '@parthikrb/common';
import { Squad } from '../models/squad';


const router = express.Router();

router.delete('/api/squads/:id', requireAuth,
    async (req: Request, res: Response) => {

        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const existingSquad = await Squad.findById(id).exec();

        if (!existingSquad) {
            throw new BadRequestError('Squad does not exists');
        }

        await Squad.findByIdAndRemove(id).exec();

        res.status(202).send(existingSquad);
    })

export { router as deleteSquadRouter };