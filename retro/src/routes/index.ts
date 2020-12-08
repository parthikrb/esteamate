import express, { Request, Response } from "express";
import { requireAuth } from "@parthikrb/common";
import { Retro } from "../models/retro";

const router = express.Router();

router.get("/api/retros", requireAuth, async (req: Request, res: Response) => {
  const retros = await Retro.find({}).populate("sprint").exec();

  res.status(200).send(retros);
});

export { router as showAllRetroRouter };
