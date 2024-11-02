import { string, z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should have at least 6 characters" }),
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should have at least 6 characters" }),
  name: z.string().min(5, { message: "Name is too short" }),
  phone: z.string().min(12, { message: "Invalid phone number" }),
});
