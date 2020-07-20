import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError } from '@parthikrb/common';
import { Sprint } from '../models/sprint';

const router = express.Router();

router.get(
    '/api/sprints/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const sprints = await Sprint
            .findById(id)
            .populate('release_name')
            .exec();

        res.status(200).send(sprints);
    }
);

export { router as showSprintRouter };