import express from "express";
import { addBarber } from "../controllers/adminController";
import upload from "../middleware/multer";
import { schemaValition } from "../middleware/schemaValidator";
import { barberRegisterSchema } from "../schemas/barberSchemas";

const adminRouter = express.Router();

adminRouter.post(
  "/add-barber",
  schemaValition(barberRegisterSchema),
  upload.single("image"),
  addBarber
);

export default adminRouter;
