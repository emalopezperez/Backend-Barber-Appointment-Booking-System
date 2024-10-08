import { Request, Response } from "express";
import { addBarberService } from "../service/adminService";

const addBarber = async (req: Request, res: Response) => {
  try {
    const newBarber = await addBarberService(req.body);
    res
      .status(201)
      .json({ message: "Barbero agregado con éxito", barber: newBarber });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar barbero",
      error: (error as Error).message,
    });
  }
};

export { addBarber };
