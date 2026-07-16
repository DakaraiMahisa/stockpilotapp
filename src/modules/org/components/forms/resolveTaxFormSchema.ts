import { z } from "zod";

export const resolveTaxFormSchema = z.object({
  taxClassId: z.string().min(1, "Tax class is required."),

  amount: z.number().positive("Amount must be greater than zero."),
  transactionDate: z.string().min(1, "Transaction date is required."),
});

export type ResolveTaxFormValues = z.infer<typeof resolveTaxFormSchema>;
