import { Request, Response } from "express";
import { loginBarberService } from "../service/barberService";

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

export { loginBarber };
