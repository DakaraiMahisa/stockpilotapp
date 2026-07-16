import { z } from "zod";

import { RATE_TYPES } from "../../types/tax.types";

export const taxRateFormSchema = z.object({
  rateType: z.enum(RATE_TYPES),

  rate: z
    .number()
    .min(0, "Rate cannot be negative.")
    .max(100, "Rate cannot exceed 100%."),

  effectiveFrom: z.string().min(1, "Effective date is required."),
});

export type TaxRateFormValues = z.output<typeof taxRateFormSchema>;
