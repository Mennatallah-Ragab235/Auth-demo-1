import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Please enter your email.")
  .pipe(z.email("Please enter a valid email address."));

export const registerSchema = z.object({
  email: emailField,
  password: z
    .string()
    .min(1, "Please enter your password.")
    .min(6, "Password must be at least 6 characters."),
});

// Login only checks that both fields are non-empty (same as the original behavior)
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().min(1, "Please enter your email."),
  password: z.string().min(1, "Please enter your password."),
});