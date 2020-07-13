import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { NotAuthorizedError, requireAuth, validateRequest, BadRequestError, natsWrapper } from '@parthikrb/common';
import { Squad, SquadDocument } from '../models/squad';
import { SquadCreatedPublisher } from '../events/squad-created-publisher';

const router = express.Router();

router.post('/api/squads', requireAuth,
    [
        body('squad_name').isString().withMessage('Squadname is required'),
        body('product_owner').isArray().withMessage('Product Owner must be an array'),
        body('scrum_master').isArray().withMessage('Scrum Master must be an array'),
        body('scrum_team').isArray().withMessage('Scrum Team must be an array')
    ],
    validateRequest,
    async (req: Request, res: Response) => {

        const { isAdmin } = req.currentUser!;
        const { squad_name } = req.body;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const existingSquad = await Squad.findOne({ squad_name }).exec();

        if (existingSquad) {
            throw new BadRequestError('Squad name already exists');
        }

        const squad: SquadDocument = Squad.build(req.body);
        await squad.save();

        await new SquadCreatedPublisher(natsWrapper.client).publish({
            id: squad.id,
            squad_name: squad.squad_name,
            product_owner: squad.product_owner,
            scrum_master: squad.scrum_master,
            scrum_team: squad.scrum_team
        });

        res.status(201).send(squad);
    })

export { router as createSquadRouter };