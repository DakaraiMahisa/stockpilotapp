import { z } from "zod";

export const passwordPolicySchema = z.object({
  minPasswordLength: z
    .number()
    .min(8, "Minimum password length must be at least 8.")
    .max(32, "Minimum password length must not exceed 32."),

  requireUppercase: z.boolean(),

  requireNumber: z.boolean(),

  requireSpecialChar: z.boolean(),

  passwordExpiryDays: z
    .number()
    .min(0, "Password expiry cannot be negative.")
    .max(365, "Password expiry cannot exceed 365 days."),

  maxLoginAttempts: z
    .number()
    .min(3, "Maximum login attempts must be at least 3.")
    .max(10, "Maximum login attempts must not exceed 10."),

  lockoutDurationMins: z
    .number()
    .min(5, "Lockout duration must be at least 5 minutes.")
    .max(1440, "Lockout duration must not exceed 1440 minutes."),
});

export type PasswordPolicyFormData = z.infer<typeof passwordPolicySchema>;
