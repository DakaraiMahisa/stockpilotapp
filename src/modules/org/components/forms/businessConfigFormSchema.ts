import { z } from "zod";
import {
  CURRENCY_POSITIONS,
  TIME_FORMATS,
  NUMBER_FORMATS,
  WEIGHT_UNITS,
  DIMENSION_UNITS,
} from "../../types/businessConfig";

export const businessConfigFormSchema = z.object({
  timezone: z.string().trim().min(1, "Timezone is required."),

  currencyCode: z
    .string()
    .trim()
    .length(3, "Currency code must be exactly 3 characters.")
    .transform((value) => value.toUpperCase()),

  currencySymbol: z
    .string()
    .trim()
    .min(1, "Currency symbol is required.")
    .max(5, "Currency symbol must not exceed 5 characters."),

  currencyPosition: z.enum(CURRENCY_POSITIONS, {
    error: "Currency position is required.",
  }),

  dateFormat: z
    .string()
    .trim()
    .min(1, "Date format is required.")
    .max(20, "Date format must not exceed 20 characters."),

  timeFormat: z.enum(TIME_FORMATS, {
    error: "Time format is required.",
  }),

  numberFormat: z.enum(NUMBER_FORMATS, {
    error: "Number format is required.",
  }),

  decimalPlaces: z
    .number({
      error: "Decimal places is required.",
    })
    .min(0, "Decimal places cannot be less than 0.")
    .max(4, "Decimal places cannot exceed 4."),

  fiscalYearStart: z
    .string()
    .trim()
    .regex(
      /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      "Fiscal year start must be in MM-dd format.",
    ),

  defaultLanguage: z
    .string()
    .trim()
    .min(1, "Default language is required.")
    .max(5, "Default language must not exceed 5 characters."),

  weightUnit: z.enum(WEIGHT_UNITS, {
    error: "Weight unit is required.",
  }),

  dimensionUnit: z.enum(DIMENSION_UNITS, {
    error: "Dimension unit is required.",
  }),
});

export type BusinessConfigFormValues = z.infer<typeof businessConfigFormSchema>;
