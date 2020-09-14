import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError, BadRequestError } from '@parthikrb/common';
import { Retro } from '../models/retro';

const router = express.Router();

router.delete(
    '/api/retros/:id',
    requireAuth,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        // if (!isAdmin) {
        //     throw new NotAuthorizedError();
        // }

        const retro = await Retro.findById(id).exec();

        if (!retro) {
            throw new BadRequestError('Retro not found');
        }

        await Retro.findByIdAndRemove(id).exec();

        res.status(204).send(retro);
    }
);

export { router as deleteRetroRouter };