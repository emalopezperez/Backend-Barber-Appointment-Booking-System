import { z } from "zod";

export const userRegistrationSchema = z.object({
  body: z.object({
    userName: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    gender: z
      .enum(["Male", "Female", "Not Selected"])
      .optional()
      .default("Not Selected"),
    dob: z.string().optional().default("Not Selected"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  }),
});

export const userLoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
});
