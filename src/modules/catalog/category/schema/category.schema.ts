import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name cannot exceed 100 characters"),

  code: z
    .string()
    .trim()
    .min(1, "Category code is required")
    .max(50, "Category code cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional()
    .or(z.literal("")),

  parentId: z.string().uuid("Invalid parent category").optional(),

  sortOrder: z
    .number()
    .int("Sort order must be a whole number")
    .min(0, "Sort order cannot be negative"),

  active: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
