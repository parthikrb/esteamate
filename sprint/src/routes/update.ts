import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError, BadRequestError, natsWrapper } from '@parthikrb/common';
import { body } from 'express-validator';
import { Sprint } from '../models/sprint';
import { SprintUpdatedPublisher } from '../events/publishers/sprint-updated-publisher';

const router = express.Router();

router.put(
    '/api/sprints/:id',
    requireAuth,
    [
        body('release_name').isString().withMessage('Release name is required'),
        body('sprint_name').isString().withMessage('Sprint name is required'),
        body('start_date').isDate().withMessage('Start date is required'),
        body('end_date').isDate().withMessage('End date is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const existingSprint = await Sprint.findById(id).exec();

        if (!existingSprint) {
            throw new BadRequestError('Sprint not found');
        }

        const sprint = await Sprint.findByIdAndUpdate(id, req.body).exec();

        await new SprintUpdatedPublisher(natsWrapper.client).publish({
            id: sprint!.id,
            release_name: sprint!.release_name,
            sprint_name: sprint!.sprint_name,
            start_date: sprint!.start_date,
            end_date: sprint!.end_date,
        });

        res.status(201).send(sprint);
    }
);

export { router as updateSprintRouter };