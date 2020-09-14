import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError, BadRequestError } from '@parthikrb/common';
import { Sprint } from '../models/sprint';

const router = express.Router();

router.delete(
    '/api/sprints/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const sprint = await Sprint.findById(id).exec();

        if (!sprint) {
            throw new BadRequestError('Sprint not found');
        }

        await Sprint.findByIdAndRemove(id).exec();

        res.status(204).send(sprint);
    }
);

export { router as deleteSprintRouter };