import express, { Request, Response } from "express";
import { Squad } from "../models/squad";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from "@parthikrb/common";

const router = express.Router();

router.get(
  "/api/squads/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const squad = await Squad.findById(id)
      .populate("product_owner")
      .populate("scrum_master")
      .populate("scrum_team")
      .exec();

    if (!squad) {
      throw new NotFoundError();
    }

    res.send(squad);
  }
);

router.get(
  "/api/squads/user/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { isAdmin } = req.currentUser!;
    const { id } = req.params;

    const associatedSquads = await Squad.find({
      $or: [
        {
          product_owner: id,
        },
        {
          scrum_master: id,
        },
        {
          scrum_team: id,
        },
      ],
    })
      .populate("product_owner")
      .populate("scrum_master")
      .populate("scrum_team")
      .exec();

    if (!associatedSquads) {
      throw new NotFoundError();
    }

    res.send(associatedSquads);
  }
);

export { router as showSquadRouter };
