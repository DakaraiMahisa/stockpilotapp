import { z } from "zod";

import { BranchType } from "../../types/org.types";

export const branchFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Branch name is required.")
    .max(100, "Branch name must not exceed 100 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Branch code is required.")
    .max(20, "Branch code must not exceed 20 characters."),

  branchType: z.nativeEnum(BranchType, {
    error: "Branch type is required.",
  }),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long.")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .optional()
    .or(z.literal("")),

  addressLine1: z
    .string()
    .trim()
    .max(255, "Address is too long.")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .trim()
    .max(100, "City is too long.")
    .optional()
    .or(z.literal("")),

  managerId: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^[0-9a-fA-F-]{36}$/.test(value),
      "Manager ID must be a valid UUID.",
    ),
});

export type BranchFormValues = z.infer<typeof branchFormSchema>;
