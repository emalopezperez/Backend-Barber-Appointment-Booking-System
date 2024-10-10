import userModel from "../models/userModel";
import barberModel from "../models/barberModel";
import appointmentModel from "../models/appointmentModel";
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

const bookAppointmentService = async (
  userId: string,
  barberId: string,
  slotDate: string,
  slotTime: string,
  message: string
) => {
  try {
    const barberData = await barberModel
      .findById(barberId)
      .select("-password -slots_booked");

    if (!barberData.available) {
      return { success: false, message: "Barber Not Available" };
    }

    const barberSlots = await barberModel.findById(barberId, "slots_booked");
    const slotsBooked = barberSlots.slots_booked || {};

    const isSlotTaken = slotsBooked[slotDate]?.includes(slotTime);
    if (isSlotTaken) {
      return { success: false, message: "Slot Not Available" };
    }

    slotsBooked[slotDate] = slotsBooked[slotDate] || [];
    slotsBooked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");

    const newAppointment = new appointmentModel({
      userId,
      barberId,
      userData,
      barberData,
      slotTime,
      slotDate,
      message,
      date: Date.now(),
    });

    await newAppointment.save();
    await barberModel.findByIdAndUpdate(barberId, {
      slots_booked: slotsBooked,
    });

    return { success: true, data: newAppointment };
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Error booking appointment");
  }
};

export {
  loginUserService,
  registerUserService,
  getProfileUserService,
  bookAppointmentService,
};
