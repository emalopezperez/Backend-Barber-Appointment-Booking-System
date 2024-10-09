import express from "express";
import upload from "../middleware/multer";
import { addBarber, loginAdmin } from "../controllers/adminController";
import { schemaValition } from "../middleware/schemaValidator";
import { barberRegisterSchema } from "../schemas/barberSchemas";
import { adminLoginSchema } from "../schemas/adminSchemas";

const adminRouter = express.Router();

adminRouter.post(
  "/add-barber",
  upload.single("image"),
  schemaValition(barberRegisterSchema),
  addBarber
);

adminRouter.post("/login", schemaValition(adminLoginSchema), loginAdmin);

export default adminRouter;
