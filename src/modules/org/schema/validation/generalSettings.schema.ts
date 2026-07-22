import { z } from "zod";

import { LANGUAGE_CODES } from "../../types/orgSettings.types";

export const generalSettingsSchema = z.object({
  defaultLanguage: z.enum(LANGUAGE_CODES, {
    error: "Please select a valid language.",
  }),

  defaultTimezone: z
    .string()
    .min(1, "Timezone is required.")
    .max(100, "Timezone is invalid."),

  maintenanceMode: z.boolean(),
});

export type GeneralSettingsFormData = z.infer<typeof generalSettingsSchema>;
