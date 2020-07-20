import express, { Request, Response } from 'express';
import { requireAuth, BadRequestError } from '@parthikrb/common';
import { Release } from '../models/release';

const router = express.Router();

router.get(
    '/api/releases/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const release = await Release
            .findById(id)
            .populate('squad_name')
            .exec();

        if (!release) {
            throw new BadRequestError('Release not found');
        }

        res.status(200).send(release);
    });

export { router as showReleaseRouter };