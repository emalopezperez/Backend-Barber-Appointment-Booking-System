import express from "express";
import { schemaValition } from "../middleware/schemaValidator";
import { barberLoginSchema } from "../schemas/barberSchemas";
import {
  appointmentCancel,
  appointmentsBarber,
  loginBarber,
} from "../controllers/barberController";
import authBarber from "../middleware/authBarber";

const barberRouter = express.Router();

barberRouter.post(
  "/auth/login",
  schemaValition(barberLoginSchema),
  loginBarber
);
barberRouter.post("/appointments", authBarber, appointmentsBarber);
barberRouter.post("/appointment-cancel", authBarber, appointmentCancel);

export default barberRouter;
