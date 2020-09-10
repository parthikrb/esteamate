import express, { Request, Response } from "express";
import {
  requireAuth,
  NotAuthorizedError,
  BadRequestError,
} from "@parthikrb/common";
import { Sprint } from "../models/sprint";

const router = express.Router();

router.get(
  "/api/sprints/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { isAdmin } = req.currentUser!;
    const { id } = req.params;

    if (!isAdmin) {
      throw new NotAuthorizedError();
    }

    const sprints = await Sprint.findById(id).populate("release").exec();

    res.status(200).send(sprints);
  }
);

router.get(
  "/api/sprints/release/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    let { id } = req.params;

    const associatedSprints = await Sprint.find({
      release: {
        $in: id.split(",").map((s: string) => s),
      },
    }).exec();

    if (!associatedSprints) {
      throw new BadRequestError("Release not found");
    }

    res.status(200).send(associatedSprints);
  }
);

export { router as showSprintRouter };
