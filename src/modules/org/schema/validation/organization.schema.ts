import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const organizationSchema = z.object({
  legalName: z
    .string()
    .trim()
    .min(2, "Legal name is required.")
    .max(200, "Legal name cannot exceed 200 characters."),

  displayName: z
    .string()
    .trim()
    .min(2, "Display name is required.")
    .max(120, "Display name cannot exceed 120 characters."),

  email: z.string().trim().email("Enter a valid email address.").max(150),

  phone: optionalText(20),

  addressLine1: optionalText(200),

  addressLine2: optionalText(200),

  city: optionalText(100),

  stateProvince: optionalText(100),

  postalCode: optionalText(20),

  countryCode: z
    .string()
    .trim()
    .length(2, "Country code must contain exactly 2 characters.")
    .transform((value) => value.toUpperCase()),

  gstinVatNumber: optionalText(20),

  website: z
    .string()
    .trim()
    .url("Enter a valid website URL.")
    .optional()
    .or(z.literal("")),
});

export type OrganizationFormData = z.infer<typeof organizationSchema>;
