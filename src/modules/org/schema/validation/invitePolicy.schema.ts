import { z } from "zod";

export const invitePolicySchema = z.object({
  inviteExpiryHours: z
    .number()
    .min(1, "Invite expiry must be at least 1 hour.")
    .max(168, "Invite expiry must not exceed 168 hours."),

  allowSelfRegistration: z.boolean(),

  requireEmailVerification: z.boolean(),
});

export type InvitePolicyFormData = z.infer<typeof invitePolicySchema>;
