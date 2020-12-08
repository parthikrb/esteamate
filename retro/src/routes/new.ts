import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@parthikrb/common";
import { body } from "express-validator";
import { Retro } from "../models/retro";

const router = express.Router();

router.post(
  "/api/retros",
  requireAuth,
  [
    body("sprint").isString().withMessage("Sprint name is required"),
    body("description").isString().withMessage("Description is required"),
    body("classification").isString().withMessage("Classification is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const retro = Retro.build(req.body);
    await retro.save();

    const newRetro = await Retro.findById(retro.id).populate("sprint").exec();

    res.status(201).send(newRetro);
  }
);

export { router as createRetroRouter };
