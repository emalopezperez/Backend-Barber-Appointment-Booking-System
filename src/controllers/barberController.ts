import { Request, Response } from "express";
import {
  appointmentsBarberService,
  loginBarberService,
} from "../service/barberService";

const loginBarber = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginBarberService(email, password);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token: result.token,
      });
    } else {
      res.status(401).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: (error as Error).message,
    });
  }
};

const appointmentsBarber = async (req: Request, res: Response) => {
  try {
    const { barberId } = req.body;

    const appointments = await appointmentsBarberService(barberId);

    return res.status(200).json({
      success: true,
      message: "List appointments",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error get appointments barber",
      error: (error as Error).message,
    });
  }
};

export { loginBarber, appointmentsBarber };
