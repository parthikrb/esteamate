import express, { Request, Response } from "express";
import { requireAuth, BadRequestError } from "@parthikrb/common";
import { Release } from "../models/release";
import mongoose from "mongoose";

const router = express.Router();

router.get(
  "/api/releases/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const release = await Release.findById(id).populate("squad").exec();

    if (!release) {
      throw new BadRequestError("Release not found");
    }

    res.status(200).send(release);
  }
);

router.get(
  "/api/releases/squad/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    let { id } = req.params;

    const associatedReleases = await Release.find({
      squad: {
        $in: id.split(",").map((s: string) => s),
      },
    }).exec();

    if (!associatedReleases) {
      throw new BadRequestError("Release not found");
    }

    res.status(200).send(associatedReleases);
  }
);

export { router as showReleaseRouter };
