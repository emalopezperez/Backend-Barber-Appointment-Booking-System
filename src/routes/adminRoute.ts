import express from "express";
import { addBarber } from "../controllers/adminController";
import upload from "../middleware/multer";
import { schemaValition } from "../middleware/schemaValidator";
import { barberRegisterSchema } from "../schemas/barberSchemas";

const adminRouter = express.Router();

adminRouter.post(
  "/add-barber",
  upload.single("image"),
  schemaValition(barberRegisterSchema),
  addBarber
);

export default adminRouter;
