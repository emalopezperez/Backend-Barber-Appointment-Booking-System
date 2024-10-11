import express from "express";
import { schemaValition } from "../middleware/schemaValidator";
import { barberLoginSchema } from "../schemas/barberSchemas";
import { appointmentsBarber, loginBarber } from "../controllers/barberController";

const barberRouter = express.Router();

barberRouter.post("/auth/login", schemaValition(barberLoginSchema), loginBarber);
barberRouter.post("/appointments", appointmentsBarber)

export default barberRouter;
