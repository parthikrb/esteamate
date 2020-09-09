import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError, BadRequestError, natsWrapper } from '@parthikrb/common';
import { body } from 'express-validator';
import { Retro } from '../models/retro';


const router = express.Router();

router.put(
    '/api/retros/:id',
    requireAuth,
    [
        body('sprint').isString().withMessage('Sprint is required'),
        body('description').isString().withMessage('Description is required'),
        body('classification').isDate().withMessage('Classification is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        // if (!isAdmin) {
        //     throw new NotAuthorizedError();
        // }

        const existingRetro = await Retro.findById(id).exec();

        if (!existingRetro) {
            throw new BadRequestError('Retro not found');
        }

        const retro = await Retro.findByIdAndUpdate(id, req.body).exec();

        res.status(201).send(retro);
    }
);

export { router as updateRetroRouter };