import { z } from "zod";

const requiredText = (label: string, max = 100) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required.`)
    .max(max, `${label} must be at most ${max} characters.`);

const requiredNumber = (label: string, min: number, max: number) =>
  z
    .number({ error: `${label} must be a number.` })
    .min(min, `${label} must be at least ${min}.`)
    .max(max, `${label} must be at most ${max}.`);

export const individualProfileSchema = z.object({
  fullName: requiredText("Full name"),
  heightCm: requiredNumber("Height (cm)", 50, 250),
  weightKg: requiredNumber("Weight (kg)", 20, 400),
});

export const companyProfileSchema = z.object({
  companyName: requiredText("Company name"),
  address: requiredText("Address", 200),
});

export type IndividualProfileInput = z.infer<typeof individualProfileSchema>;
export type CompanyProfileInput = z.infer<typeof companyProfileSchema>;