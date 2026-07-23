import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().trim().min(1, "Current password is required."),

    newPassword: z
      .string()
      .trim()
      .min(8, "New password must be at least 8 characters.")
      .max(32, "New password cannot exceed 32 characters."),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "New password must be different from the current password.",
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
