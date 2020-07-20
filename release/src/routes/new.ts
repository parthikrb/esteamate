import express, { Request, Response } from 'express';
import { requireAuth, validateRequest, NotAuthorizedError } from '@parthikrb/common';
import { body } from 'express-validator';
import { Release } from '../models/release';

const router = express.Router();

router.post(
    '/api/releases',
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

        if (!isAdmin) {
            throw new NotAuthorizedError();
        }

        const release = Release.build(req.body);
        await release.save();

        res.status(201).send(release);
    }
);

export { router as createReleaseRouter };