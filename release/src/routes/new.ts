import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  natsWrapper,
} from "@parthikrb/common";
import { body } from "express-validator";
import { Release } from "../models/release";
import { ReleaseCreatedPublisher } from "../events/publishers/release-created-publisher";

const router = express.Router();

router.post(
  "/api/releases",
  requireAuth,
  [
    body("squad").isString().withMessage("Squad is required"),
    body("release_name").isString().withMessage("Release name is required"),
    body("start_date").isString().withMessage("Start date is required"),
    body("end_date").isString().withMessage("End date is required"),
    body("dev_reserve")
      .isNumeric()
      .withMessage("Development reserve is required"),
    body("qa_reserve").isNumeric().withMessage("QA reserve is required"),
    body("is_release_reserve")
      .isBoolean()
      .withMessage("Is_release_reserve is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { isAdmin } = req.currentUser!;

    if (!isAdmin) {
      throw new NotAuthorizedError();
    }

    const release = Release.build(req.body);
    await release.save();

    const newRelease = await Release.findById(release.id).populate("squad").exec();

    await new ReleaseCreatedPublisher(natsWrapper.client).publish({
      id: release.id,
      squad_name: release.squad,
      release_name: release.release_name,
      start_date: release.start_date,
      end_date: release.end_date,
      dev_reserve: release.dev_reserve,
      qa_reserve: release.qa_reserve,
      ba_reserve: release.ba_reserve,
      is_release_reserve: release.is_release_reserve,
    });

    res.status(201).send(newRelease);
  }
);

export { router as createReleaseRouter };
