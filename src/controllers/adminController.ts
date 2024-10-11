import { Request, Response } from "express";
import {
  addBarberService,
  loginAdminService,
  getAllBarbersService,
  getDataDashboardService,
  getAllAppointmentsService,
  cancelAppointmentService,
  deleteBarberService,
} from "../service/adminService";

const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginAdminService(email, password);

    if (result.success) {
      res.status(200).json({
        success: true,
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

const addBarber = async (req: Request, res: Response) => {
  try {
    const dataBarber = req.body;
    const imageFile = req.file as Express.Multer.File | undefined;

    if (!imageFile) {
      res.status(400).json({
        success: true,
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

const deleteBarber = async (req: Request, res: Response) => {
  try {
    const { barberId } = req.body;

    const barberDelete = await deleteBarberService(barberId);

    res.status(201).json({
      success: true,
      message: "Barber deleted",
      data: barberDelete,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error: (error as Error).message,
    });
  }
};

const getAllBarbers = async (req: Request, res: Response) => {
  try {
    const allBarbers = await getAllBarbersService();

    res.status(201).json({
      success: true,
      message: "Lista de barberos",
      barbers: allBarbers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error: (error as Error).message,
    });
  }
};

const getDataDashboard = async (req: Request, res: Response) => {
  try {
    const dataDashboard = await getDataDashboardService();

    res
      .status(201)
      .json({ success: true, message: "Data dashboard", data: dataDashboard });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error: (error as Error).message,
    });
  }
};

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await getAllAppointmentsService();

    res.status(201).json({
      success: true,
      message: "List appointments",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error: (error as Error).message,
    });
  }
};

const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.body;

    const appoimentCancel = await cancelAppointmentService(appointmentId);

    res.status(201).json({
      success: true,
      message: "Cancelacion exitosa",
      data: appoimentCancel,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ",
      error: (error as Error).message,
    });
  }
};

export {
  addBarber,
  loginAdmin,
  getAllBarbers,
  getDataDashboard,
  getAllAppointments,
  cancelAppointment,
  deleteBarber
};
