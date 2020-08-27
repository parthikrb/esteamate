import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError } from '@parthikrb/common';
import { Release } from '../models/release';

const router = express.Router();

router.get(
    '/api/releases',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const releases = await Release
            .find({})
            .populate('squad')
            .exec();

        res.status(200).send(releases);
    }
);

export { router as showAllReleaseRouter };