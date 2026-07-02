import type { UpdateOrganizationRequest } from "../types/org.types";

import type { OrganizationFormData } from "../schema/validation/organization.schema";

const emptyToNull = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  return trimmed.length === 0 ? null : trimmed;
};

export function toUpdateOrganizationRequest(
  form: OrganizationFormData,
): UpdateOrganizationRequest {
  return {
    legalName: form.legalName,
    displayName: form.displayName,
    email: form.email,
    countryCode: form.countryCode,

    phone: emptyToNull(form.phone),
    addressLine1: emptyToNull(form.addressLine1),
    addressLine2: emptyToNull(form.addressLine2),
    city: emptyToNull(form.city),
    stateProvince: emptyToNull(form.stateProvince),
    postalCode: emptyToNull(form.postalCode),
    gstinVatNumber: emptyToNull(form.gstinVatNumber),
    website: emptyToNull(form.website),
  };
}
