import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest, NotFoundError, natsWrapper } from '@parthikrb/common';
import { Squad } from '../models/squad';
import { SquadUpdatedPublisher } from '../events/publishers/squad-updated-publisher';

const router = express.Router();

router.put(
    '/api/squads/:id',
    requireAuth,
    [
        body('squad_name').isString().withMessage('Squadname is required'),
        body('product_owner').isArray().withMessage('Product Owner must be an id'),
        body('scrum_master').isArray().withMessage('Scrum Master must be an id'),
        body('scrum_team').isArray().withMessage('Scrum Team must be an id')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const existingSquad = await Squad.findById(id).exec();

        if (!existingSquad) {
            throw new NotFoundError();
        }

        const updatedSquad = await Squad.findByIdAndUpdate(id, req.body);

        await new SquadUpdatedPublisher(natsWrapper.client).publish({
            id: updatedSquad!.id,
            squad_name: updatedSquad!.squad_name,
            product_owner: updatedSquad!.product_owner,
            scrum_master: updatedSquad!.scrum_master,
            scrum_team: updatedSquad!.scrum_team
        });

        res.status(200).send(updatedSquad);
    });

export { router as updateSquadRouter };