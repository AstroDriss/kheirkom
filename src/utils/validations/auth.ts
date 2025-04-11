import { z } from "zod";
export const donorFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First Name must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "Last Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    location: z.string().min(2, { message: "Please enter your location." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Association form schema
export const associationFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "Organization name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
    about: z.string().min(10, {
      message: "Please provide a brief description of your organization.",
    }),
    website: z
      .string()
      .url({ message: "Please enter a valid URL." })
      .optional()
      .or(z.literal("")),
    phone: z.string().min(5, { message: "Please enter a valid phone number." }),
    location: z
      .string()
      .min(5, { message: "Please enter your organization's address." }),
    type: z.string({ required_error: "Please select an organization type." }),
    customType: z.string().optional(),
    registrationNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(6),
});
