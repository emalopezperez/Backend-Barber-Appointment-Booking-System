import express from "express";
import { schemaValition } from "../middleware/schemaValidator";
import { loginUser, registerUser } from "../controllers/userController";
import { userLoginSchema, userRegistrationSchema } from "../schemas/userSchemas";

const userRouter = express.Router();

userRouter.post(
  "/register",
  schemaValition(userRegistrationSchema),
  registerUser
);
userRouter.post(
  "/login",
  schemaValition(userLoginSchema),
  loginUser
);

export default userRouter;
