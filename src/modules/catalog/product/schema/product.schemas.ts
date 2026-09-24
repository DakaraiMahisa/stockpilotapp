import { z } from "zod";

const unitOfMeasureSchema = z.enum([
  "PCS",
  "KG",
  "G",
  "LTR",
  "ML",
  "BOX",
  "PACK",
  "ROLL",
  "MTR",
]);

export const productCreateSchema = z
  .object({
    sku: z
      .string()
      .trim()
      .max(50, "SKU must not exceed 50 characters")
      .regex(
        /^$|^[A-Za-z0-9-]+$/,
        "SKU may contain only letters, numbers and hyphens",
      )
      .optional(),

    barcode: z
      .string()
      .trim()
      .max(60, "Barcode must not exceed 60 characters")
      .optional()
      .or(z.literal("")),

    name: z
      .string()
      .trim()
      .min(1, "Product name is required")
      .max(200, "Product name must not exceed 200 characters"),

    description: z
      .string()
      .trim()
      .max(5000, "Description must not exceed 5000 characters")
      .optional()
      .or(z.literal("")),

    brandId: z.string().optional(),
    categoryId: z.string().min(1, "Category is required"),
    taxClassId: z.string().min(1, "Tax class is required"),

    unitOfMeasure: unitOfMeasureSchema,

    trackBatches: z.boolean().optional(),

    minStockLevel: z
      .number()
      .int("Minimum stock level must be a whole number")
      .min(0, "Minimum stock level cannot be negative")
      .optional(),

    maxStockLevel: z
      .number()
      .int("Maximum stock level must be a whole number")
      .min(0, "Maximum stock level cannot be negative")
      .optional(),

    service: z.boolean().optional(),

    weightKg: z
      .number()
      .min(0, "Weight cannot be negative")
      .max(99999.999, "Weight is too large")
      .optional(),

    notes: z
      .string()
      .trim()
      .max(5000, "Notes must not exceed 5000 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      data.minStockLevel === undefined ||
      data.maxStockLevel === undefined ||
      data.minStockLevel <= data.maxStockLevel,
    {
      message: "Minimum stock level must not exceed maximum stock level",
      path: ["maxStockLevel"],
    },
  );

export const productUpdateSchema = z
  .object({
    barcode: z
      .string()
      .trim()
      .max(60, "Barcode must not exceed 60 characters")
      .optional()
      .or(z.literal("")),

    name: z
      .string()
      .trim()
      .max(200, "Product name must not exceed 200 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(5000, "Description must not exceed 5000 characters")
      .optional()
      .or(z.literal("")),

    brandId: z.string().optional(),
    categoryId: z.string().optional(),
    taxClassId: z.string().optional(),

    unitOfMeasure: unitOfMeasureSchema.optional(),

    trackBatches: z.boolean().optional(),

    minStockLevel: z
      .number()
      .int("Minimum stock level must be a whole number")
      .min(0, "Minimum stock level cannot be negative")
      .optional(),

    maxStockLevel: z
      .number()
      .int("Maximum stock level must be a whole number")
      .min(0, "Maximum stock level cannot be negative")
      .optional(),

    active: z.boolean().optional(),

    service: z.boolean().optional(),

    weightKg: z
      .number()
      .min(0, "Weight cannot be negative")
      .max(99999.999, "Weight is too large")
      .optional(),

    notes: z
      .string()
      .trim()
      .max(5000, "Notes must not exceed 5000 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) =>
      data.minStockLevel === undefined ||
      data.maxStockLevel === undefined ||
      data.minStockLevel <= data.maxStockLevel,
    {
      message: "Minimum stock level must not exceed maximum stock level",
      path: ["maxStockLevel"],
    },
  );

export type ProductCreateFormValues = z.infer<typeof productCreateSchema>;
export type ProductUpdateFormValues = z.infer<typeof productUpdateSchema>;
