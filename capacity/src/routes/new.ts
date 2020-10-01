import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@parthikrb/common";
import { body } from "express-validator";
import { Leave } from "../models/leave";

const router = express.Router();

router.post(
  "/api/leaves",
  requireAuth,
  [
    body("user").isString().withMessage("User is required"),
    body("username").isString().withMessage("Username is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const leave = Leave.build(req.body);
    await leave.save();

    const newLeave = await Leave.findById(leave.id).exec();
    res.status(201).send(newLeave);
  }
);

export { router as createLeaveRouter };
