import express, { Request, Response } from "express";
import {
  requireAuth,
  BadRequestError,
} from "@parthikrb/common";
import { Leave } from "../models/leave";

const router = express.Router();

router.delete(
  "/api/leaves/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const leave = await Leave.findById(id).exec();

    if (!leave) {
      throw new BadRequestError("Leave not found");
    }

    await Leave.findByIdAndRemove(id).exec();

    res.status(204).send(leave);
  }
);

export { router as deleteLeaveRouter };
