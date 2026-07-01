export interface Organization {
  id: string;

  legalName: string;
  displayName: string;

  email: string;
  phone: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  city: string | null;
  stateProvince: string | null;
  postalCode: string | null;

  countryCode: string;

  gstinVatNumber: string | null;

  logoUrl: string | null;

  website: string | null;
}

export interface UpdateOrganizationRequest {
  legalName: string;
  displayName: string;

  email: string;
  phone: string | null;

  addressLine1: string | null;
  addressLine2: string | null;

  city: string | null;
  stateProvince: string | null;
  postalCode: string | null;

  countryCode: string;

  gstinVatNumber: string | null;

  website: string | null;
}

export interface LogoPresignedRequest {
  filename: string;
  contentType: string;
}

export interface PresignedUploadResponse {
  uploadUrl: string;
  objectKey: string;
  expiresIn: number;
}

export interface LogoConfirmRequest {
  objectKey: string;
}

export interface UploadLogoFile {
  file: File;
}
