import { z } from "zod";

export const signUpSchema = z
  .object({
    role: z.enum(["user", "association"]),
    firstName: z.string().min(2, "Name is too short"),
    lastName: z.string().min(2, "Last name is too short").optional(),
    location: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine(
    (data) => {
      if (data.role === "user" && !data.lastName) {
        return false;
      }
      if (data.role === "association" && !data.location) {
        return false;
      }
      return true;
    },
    {
      message: "Invalid data for the selected role",
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(6),
});
