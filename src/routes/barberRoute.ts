import express from "express";
import { schemaValition } from "../middleware/schemaValidator";
import { barberLoginSchema } from "../schemas/barberSchemas";
import { loginBarber } from "../controllers/barberController";

const barberRouter = express.Router();

barberRouter.post("/login", schemaValition(barberLoginSchema), loginBarber);

export default barberRouter;
