import { Request, Response } from "express";
import { addBarberService, loginAdminService } from "../service/adminService";

const addBarber = async (req: Request, res: Response) => {
  try {
    const dataBarber = req.body;
    const imageFile = req.file as Express.Multer.File | undefined;

    if (!imageFile) {
      res.status(400).json({
        message: "Error: se requiere una imagen para agregar al barbero",
      });
      return;
    }

    const newBarber = await addBarberService(dataBarber, imageFile);
    res
      .status(201)
      .json({ message: "Barbero creado con éxito", barber: newBarber });
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar barbero",
      error: (error as Error).message,
    });
  }
};

const loginAdmin = async (req: Request, res: Response)=> {
  try {
    const { email, password } = req.body;
    const result = await loginAdminService(email, password);

    if (result.success) {
      res.status(200).json({
        message: "Iniciado sesión correctamente",
        token: result.token,
      });
    } else {
      res.status(401).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error en el servidor",
      error: (error as Error).message,
    });
  }
};

export { addBarber, loginAdmin };
