import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfileUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import {
  bookAppointmentSchema,
  cancelAppointmentSchema,
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/userSchemas";
import { schemaValition } from "../middleware/schemaValidator";
import authUser from "../middleware/authUser";

const userRouter = express.Router();

userRouter.post(
  "/auth/register",
  schemaValition(userRegistrationSchema),
  registerUser
);
userRouter.post("/auth/login", schemaValition(userLoginSchema), loginUser);
userRouter.post(
  "/book-appointment",
  schemaValition(bookAppointmentSchema),
  authUser,
  bookAppointment
);
userRouter.post(
  "/cancel-appointment",
  schemaValition(cancelAppointmentSchema),
  authUser,
  cancelAppointment
);

userRouter.get("/get-profile", authUser, getProfileUser);

export default userRouter;
