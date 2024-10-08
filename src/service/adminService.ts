import BarberModel from "../models/barberModel";
import { Barber } from "../types/barber-type";

const addBarberService = async (data: Barber) => {
  try {
    const { name, email, password, image, about, available, slots_booked, date, address } = data;

    // const newBarber = new BarberModel(data);
    // const savedBarber = await newBarber.save();
    // return savedBarber;

    console.log(data)
    
  } catch (error) {
    console.error("Error al guardar el barbero:", error);
    throw new Error("No se pudo guardar el barbero");
  }
};

export { addBarberService };
