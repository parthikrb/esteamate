import express, { Request, Response } from "express";
import { requireAuth } from "@parthikrb/common";
import { Leave } from "../models/leave";

const router = express.Router();

router.get("/api/leaves", requireAuth, async (req: Request, res: Response) => {
  const leaves = await Leave.find({}).exec();

  res.status(200).send(leaves);
});

export { router as showAllLeaveRouter };
