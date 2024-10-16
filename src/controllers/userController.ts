import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
  getProfileUserService,
  bookAppointmentService,
  cancelAppointmentService,
  listAppointmentService,
} from "../service/userService";

const registerUser = async (req: Request, res: Response) => {
  const dataUser = req.body;

  try {
    const result = await registerUserService(dataUser);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        token: result.token,
        dataUser: dataUser,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: (error as Error).message,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await loginUserService(email, password);

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

const getProfileUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const result = await getProfileUserService(userId);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Success",
        data: result.data,
      });
    }
    res.status(404).json({
      message: result.message,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user profile",
      error: (error as Error).message,
    });
  }
};

const bookAppointment = async (req: Request, res: Response) => {
  const { userId, barberId, slotDate, slotTime, message } = req.body;

  try {
    const result = await bookAppointmentService(
      userId,
      barberId,
      slotDate,
      slotTime,
      message
    );

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Appointment booked successfully",
        data: result.data,
      });
    } else {
      return res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error booking appointment",
      error: (error as Error).message,
    });
  }
};

const cancelAppointment = async (req: Request, res: Response) => {
  const { userId, appointmentId } = req.body;

  try {
    const result = await cancelAppointmentService(userId, appointmentId);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Cancel appointment successfully",
      });
    } else {
      return res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error cancel appointment",
      error: (error as Error).message,
    });
  }
};

const listAppointment = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const result = await listAppointmentService(userId);

    res.status(200).json({
      success: true,
      message: "Success",
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving user profile",
      error: (error as Error).message,
    });
  }
};

export {
  loginUser,
  registerUser,
  getProfileUser,
  bookAppointment,
  cancelAppointment,
  listAppointment,
};
