import express, { Request, Response } from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
} from "@parthikrb/common";
import { body } from "express-validator";
import { Retro } from "../models/retro";

const router = express.Router();

router.put(
  "/api/retros/:id",
  requireAuth,
  [
    body("sprint").isString().withMessage("Sprint is required"),
    body("description").isString().withMessage("Description is required"),
    body("classification").isString().withMessage("Classification is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    // if (!isAdmin) {
    //     throw new NotAuthorizedError();
    // }

    const existingRetro = await Retro.findById(id).exec();

    if (!existingRetro) {
      throw new BadRequestError("Retro not found");
    }

    await Retro.findByIdAndUpdate(id, req.body).exec();

    const newRetro = await Retro.findById(id).populate("sprint").exec();
    res.status(201).send(newRetro);
  }
);

export { router as updateRetroRouter };
