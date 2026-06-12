import { z } from "zod";

export const registerSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required").max(150),

  firstName: z.string().min(1, "First name is required").max(80),

  lastName: z.string().min(1, "Last name is required").max(80),

  email: z.email("Invalid email address").max(150),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100),

  timezone: z.string().max(50).optional(),

  currencyCode: z.string().max(10).optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
