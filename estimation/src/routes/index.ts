import express, { Request, Response } from "express";
import { requireAuth } from "@parthikrb/common";
import { Capacity } from "../models/capacity";

const router = express.Router();

router.get(
  "/api/estimation/sprint/:sprint",
  // requireAuth,
  async (req: Request, res: Response) => {
    const { sprint } = req.params;
    const capacities = await Capacity.find({ sprint }).exec();
    res.status(200).send(capacities);
  }
);

export { router as indexCapacityRouter };
