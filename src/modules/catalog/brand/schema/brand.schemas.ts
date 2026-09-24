import { z } from "zod";

export const brandCreateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Brand name is required")
    .max(100, "Brand name must not exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(1, "Brand code is required")
    .max(20, "Brand code must not exceed 20 characters")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Brand code must contain only uppercase letters, numbers, underscores, or hyphens",
    ),

  logoObjectKey: z
    .string()
    .trim()
    .max(500, "Logo object key must not exceed 500 characters")
    .optional(),

  website: z
    .string()
    .trim()
    .max(200, "Website must not exceed 200 characters")
    .optional(),
});

export const brandUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, "Brand name must not exceed 100 characters")
    .optional(),

  code: z
    .string()
    .trim()
    .max(20, "Brand code must not exceed 20 characters")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Brand code must contain only uppercase letters, numbers, underscores, or hyphens",
    )
    .optional(),

  logoObjectKey: z
    .string()
    .trim()
    .max(500, "Logo object key must not exceed 500 characters")
    .optional(),

  website: z
    .string()
    .trim()
    .max(200, "Website must not exceed 200 characters")
    .optional(),

  active: z.boolean().optional(),
});

export type BrandCreateFormValues = z.infer<typeof brandCreateSchema>;
export type BrandUpdateFormValues = z.infer<typeof brandUpdateSchema>;
