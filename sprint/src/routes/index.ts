import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError } from '@parthikrb/common';
import { Sprint } from '../models/sprint';


const router = express.Router();

router.get(
    '/api/sprints',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const sprints = await Sprint
            .find({})
            .populate('release_name')
            .exec();

        res.status(200).send(sprints);
    }
);

export { router as showAllSprintRouter };