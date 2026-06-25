import { z } from "zod";

export const loginSchema = z.object({
  tenantCode: z.string().min(1, "Tenant code is required"),

  email: z.email("Invalid email address"),

  password: z.string().min(8, "Password must be at least 8 characters"),

  deviceInfo: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
