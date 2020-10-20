import express, { Request, Response } from "express";
import { body } from "express-validator";

import { validateRequest } from "@parthikrb/common";
import { Capacity } from "../models/capacity";

const router = express.Router();

router.post(
  "/api/estimation",
  // requireAuth,
  [
    body("sprint").isString().withMessage("Sprint is required"),
    body("story").isString().withMessage("Story must be a string"),
    body("dev_estimation")
      .isNumeric()
      .withMessage("Dev Estimation must be a number"),
    body("qa_estimation")
      .isNumeric()
      .withMessage("QA Estimation must be a number"),
    body("ba_estimation")
      .isNumeric()
      .withMessage("BA Estimation must be a number"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const capacity = Capacity.build(req.body);
    await capacity.save();
    res.status(201).send(capacity);
  }
);

export { router as createCapacityRouter };
