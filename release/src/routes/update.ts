import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError, NotFoundError, natsWrapper } from '@parthikrb/common';
import { body } from 'express-validator';
import { Release } from '../models/release';
import { ReleaseUpdatedPublisher } from '../events/publishers/release-updated-publisher';

const router = express.Router();

router.put(
    '/api/releases/:id',
    requireAuth,
    [
        body('squad_name').isString().withMessage('Squad name is required'),
        body('release_name').isString().withMessage('Release name is required'),
        body('start_date').isDate().withMessage('Start date is required'),
        body('end_date').isDate().withMessage('End date is required'),
        body('dev_reserve').isNumeric().withMessage('Development reserve is required'),
        body('qa_reserve').isNumeric().withMessage('QA reserve is required'),
        body('is_release_reserve').isBoolean().withMessage('Is_release_reserve is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { isAdmin } = req.currentUser!;
        const { id } = req.params;

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const existingRelease = await Release.findById(id).exec();

        if (!existingRelease) {
            throw new NotFoundError();
        }

        const release = await Release.findByIdAndUpdate(id, req.body).exec();

        await new ReleaseUpdatedPublisher(natsWrapper.client).publish({
            id: release!.id,
            squad_name: release!.squad_name,
            release_name: release!.release_name,
            start_date: release!.start_date,
            end_date: release!.end_date,
            dev_reserve: release!.dev_reserve,
            qa_reserve: release!.qa_reserve,
            ba_reserve: release!.ba_reserve,
            is_release_reserve: release!.is_release_reserve,
        });
        res.status(201).send(release);
    }
);

export { router as updateReleaseRouter };