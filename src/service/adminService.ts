import BarberModel from "../models/barberModel";
import { Barber } from "../types/barber-type";
import { Request } from "express";
import bcrypt from "bcryptjs";
import { uploadImage } from "../utils/uploadImage";

const addBarberService = async (req: Request) => {
  try {
    const dataBarber: Barber = req.body;
    const imageFile = req.file;

    const {
      name,
      email,
      password,
      about,
      available,
      slots_booked,
      date,
      address,
    } = dataBarber;

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
      date,
      address,
      image: imageUrl,
    };

    const newBarber = new BarberModel(data);
    const savedBarber = await newBarber.save();
    return savedBarber;
    
  } catch (error) {
    console.error("Error al guardar el barbero:", error);
    throw new Error("No se pudo guardar el barbero");
  }
};

export { addBarberService };
