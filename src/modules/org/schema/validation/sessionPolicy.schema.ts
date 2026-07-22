import { z } from "zod";

export const sessionPolicySchema = z.object({
  sessionTimeoutMins: z
    .number()
    .min(5, "Session timeout must be at least 5 minutes.")
    .max(480, "Session timeout must not exceed 480 minutes."),

  maxConcurrentSessions: z
    .number()
    .min(1, "Maximum concurrent sessions must be at least 1.")
    .max(5, "Maximum concurrent sessions must not exceed 5."),

  rememberMeDays: z
    .number()
    .min(0, "Remember me duration cannot be negative.")
    .max(30, "Remember me duration must not exceed 30 days."),

  enforceDeviceTrust: z.boolean(),
});

export type SessionPolicyFormData = z.infer<typeof sessionPolicySchema>;
