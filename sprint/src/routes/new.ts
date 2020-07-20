import express, { Request, Response } from 'express';
import {
    requireAuth, validateRequest, NotAuthorizedError, natsWrapper
} from '@parthikrb/common';
import { body } from 'express-validator';
import { Sprint } from '../models/sprint';
import { SprintCreatedPublisher } from '../events/publishers/sprint-created-publisher';

const router = express.Router();

router.post(
    '/api/sprints',
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

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const sprint = Sprint.build(req.body);
        await sprint.save();

        await new SprintCreatedPublisher(natsWrapper.client).publish({
            id: sprint.id,
            release_name: sprint.release_name,
            sprint_name: sprint.sprint_name,
            start_date: sprint.start_date,
            end_date: sprint.end_date,
        });

        res.status(201).send(sprint);
    }
);

export { router as createSprintRouter };