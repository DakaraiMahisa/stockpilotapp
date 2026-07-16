import { z } from "zod";

import { TAX_TYPES } from "../../types/tax.types";

import { taxRateFormSchema } from "./taxRateFormSchema";

export const taxFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tax class name is required.")
    .max(80, "Tax class name cannot exceed 80 characters."),

  code: z
    .string()
    .trim()
    .min(1, "Tax class code is required.")
    .max(20, "Tax class code cannot exceed 20 characters.")
    .regex(
      /^[A-Za-z0-9_-]+$/,
      "Tax class code may contain only letters, numbers, hyphens and underscores.",
    ),

  taxType: z.enum(TAX_TYPES),

  hsnSacCode: z
    .string()
    .trim()
    .max(10, "HSN/SAC code cannot exceed 10 characters.")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters.")
    .transform((v) => (v === "" ? undefined : v))
    .optional(),

  rates: z
    .array(taxRateFormSchema)
    .min(1, "At least one tax rate is required."),
});
export type TaxFormValues = z.output<typeof taxFormSchema>;
