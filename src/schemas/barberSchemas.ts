import { z } from "zod";


export const barberLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});


export const barberRegisterSchema = z.object({
  body: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email debe ser válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    about: z.string(),
    available: z.string(),
  }),
});
