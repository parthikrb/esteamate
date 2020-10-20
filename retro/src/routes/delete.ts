import express, { Request, Response } from 'express';
import { requireAuth, BadRequestError } from '@parthikrb/common';
import { Retro } from '../models/retro';

const router = express.Router();

router.delete(
    '/api/retros/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const retro = await Retro.findById(id).exec();

        if (!retro) {
            throw new BadRequestError('Retro not found');
        }

        await Retro.findByIdAndRemove(id).exec();

        res.status(204).send(retro);
    }
);

export { router as deleteRetroRouter };