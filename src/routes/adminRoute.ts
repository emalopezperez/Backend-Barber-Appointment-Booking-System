import express from "express";
import upload from "../middleware/multer";
import { addBarber, loginAdmin } from "../controllers/adminController";
import { schemaValition } from "../middleware/schemaValidator";
import { barberRegisterSchema } from "../schemas/barberSchemas";
import { adminLoginSchema } from "../schemas/adminSchemas";
import authAdmin from "../middleware/authAdmin";

const adminRouter = express.Router();

adminRouter.post("/login", schemaValition(adminLoginSchema), loginAdmin);
adminRouter.post(
  "/add-barber",
  authAdmin,
  upload.single("image"),
  schemaValition(barberRegisterSchema),
  addBarber
);

export default adminRouter;
