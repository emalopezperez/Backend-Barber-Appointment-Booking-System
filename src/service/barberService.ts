import barberModel from "../models/barberModel";
import appointmentModel from "../models/appointmentModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Appointment } from "../types/appointment-type";

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

const appointmentsBarberService = async (barberId: string) => {
  try {
    const appointments = await appointmentModel.find({ barberId });

    return { success: true, data: appointments };
  } catch (error) {
    throw new Error("Error ");
  }
};

const appointmentCancelService = async (
  barberId: string,
  appointmentId: string
) => {
  try {
    const appointment: Appointment | null = await appointmentModel.findById(
      appointmentId
    );
    if (appointment && appointment.barberId === barberId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return { success: true, message: "Cita cancelada correctamente" };
    }

    return { success: false, message: "Error al cancelar la cita" };
  } catch (error) {
    throw new Error("Error ");
  }
};

export {
  loginBarberService,
  appointmentsBarberService,
  appointmentCancelService,
};
