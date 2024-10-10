import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types/user-type";

const registerUserService = async (dataUser: User) => {
  try {
    const { email, password, phone, gender, dob, userName } = dataUser;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return { success: false, message: "Email already in use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      userName,
      email,
      phone,
      gender,
      dob,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || "");

    return { success: true, message: "User registered successfully", token };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

const loginUserService = async (email: string, password: string) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "");

      return { success: true, token: token };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    throw new Error("Unable to log in");
  }
};

const getProfileUserService = async (userId: string) => {
  try {
    const user = await userModel.findById(userId).select("-password");

    if (user) {
      return { success: true, data: user };
    } else {
      return { success: false, message: "User not found" };
    }
  } catch (error) {
    throw new Error("Error retrieving user profile");
  }
};

export { loginUserService, registerUserService, getProfileUserService };
