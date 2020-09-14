import express, { Request, Response } from "express";
import { requireAuth, NotAuthorizedError } from "@parthikrb/common";
import { Retro } from "../models/retro";

const router = express.Router();

router.get(
  "/api/retros/id/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { isAdmin } = req.currentUser!;
    const { id } = req.params;

    // if (!isAdmin) {
    //   throw new NotAuthorizedError();
    // }

    const retro = await Retro.findById(id).populate("sprint").exec();

    res.status(200).send(retro);
  }
);

router.get(
  "/api/retros/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { isAdmin } = req.currentUser!;
    const { id } = req.params;

    if (!isAdmin) {
      throw new NotAuthorizedError();
    }

    const retros = await Retro.find({ sprint: id }).populate("sprint").exec();

    res.status(200).send(retros);
  }
);

export { router as showRetroRouter };
