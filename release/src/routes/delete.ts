import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError, NotFoundError } from '@parthikrb/common';
import { Release } from '../models/release';

const router = express.Router();

router.delete(
    '/api/releases/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const existingRelease = await Release
            .findById(id)
            .populate('squad_name')
            .exec();

        if (!existingRelease) {
            throw new NotFoundError();
        }

        await Release.findByIdAndRemove(id).exec();

        res.status(200).send(existingRelease);

    }
);

export { router as deleteReleaseRouter };