import express, { Request, Response } from "express";
import { requireAuth } from "@parthikrb/common";
import { Leave } from "../models/leave";

const router = express.Router();

router.get(
  "/api/leaves/user/:user",
  requireAuth,
  async (req: Request, res: Response) => {
    const { user } = req.params;

    const leave = await Leave.find({ user }).exec();

    res.status(200).send(leave);
  }
);

export { router as showLeaveRouter };
