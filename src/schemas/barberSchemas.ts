import { z } from "zod";

export const barberRegisterSchema = z.object({
  body: z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El email debe ser válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    image: z.string().url("La imagen debe ser una URL válida"),
    about: z.string(),
    address: z.record(z.string(), z.any()),
    available: z.boolean().default(true),
    slots_booked: z.record(z.string(), z.any()),
    date: z.number().positive("La fecha debe ser un número positivo"),
  }),
});
