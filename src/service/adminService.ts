import appointmentModel from "../models/appointmentModel";
import BarberModel from "../models/barberModel";
import userModel from "../models/userModel";
import { BarberData } from "../types/barber-type";
import { uploadImage } from "../utils/uploadImage";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginAdminService = async (email: string, password: string) => {
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(email + password, process.env.JWT_SECRET || "");
    return { success: true, token };
  } else {
    return { success: false, message: "Credenciales inválidas" };
  }
};

const addBarberService = async (
  dataBarber: BarberData,
  imageFile: Express.Multer.File
) => {
  try {
    const { name, email, password, about, available, slots_booked } =
      dataBarber;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const imageUrl = await uploadImage(imageFile);

    const data = {
      name,
      email,
      password: hashedPassword,
      about,
      available,
      slots_booked,
      date: Date.now(),
      image: imageUrl,
    };

    const newBarber = new BarberModel(data);
    const savedBarber = await newBarber.save();

    return savedBarber;
  } catch (error) {
    throw new Error("No se pudo guardar el barbero");
  }
};

const getAllBarbersService = async () => {
  try {
    const barbers = await BarberModel.find({}).select("-password");

    return barbers;
  } catch (error) {
    throw new Error("No se pudo obtener todos los barberos");
  }
};

const getDataDashboardService = async () => {
  try {
    const barbers = await BarberModel.find({}).select("-password");
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const data = {
      barbers,
      users,
      appointments,
    };

    return data;
  } catch (error) {
    throw new Error("No se pudo obtener la data");
  }
};

const getAllAppointmentsService = async () => {
  try {
    const data = await appointmentModel.find({});

    return data;
  } catch (error) {
    throw new Error("No se pudo obtener la data");
  }
};

export {
  addBarberService,
  loginAdminService,
  getAllBarbersService,
  getDataDashboardService,
  getAllAppointmentsService,
};
