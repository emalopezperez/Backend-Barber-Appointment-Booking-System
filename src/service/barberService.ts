import barberModel from "../models/barberModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginBarberService = async (email: string, password: string) => {
  try {
    const barber = await barberModel.findOne({ email });
    if (!barber) {
      return { success: false, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, barber.password);

    if (isMatch) {
      const token = jwt.sign({ id: barber._id }, process.env.JWT_SECRET || "");

      return { success: true, token };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    throw new Error("Unable to log in");
  }
};

export { loginBarberService };
