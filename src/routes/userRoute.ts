import express from "express";
import { schemaValition } from "../middleware/schemaValidator";
import {
  getProfileUser,
  loginUser,
  registerUser,
} from "../controllers/userController";
import {
  userLoginSchema,
  userRegistrationSchema,
} from "../schemas/userSchemas";

import authUser from "../middleware/authUser";

const userRouter = express.Router();

userRouter.post(
  "/auth/register",
  schemaValition(userRegistrationSchema),
  registerUser
);
userRouter.post("/auth/login", schemaValition(userLoginSchema), loginUser);

userRouter.get("/get-profile", authUser, getProfileUser);

export default userRouter;
