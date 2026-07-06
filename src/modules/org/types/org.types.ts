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

export const BranchType = {
  RETAIL: "RETAIL",
  WHOLESALE: "WHOLESALE",
  WAREHOUSE: "WAREHOUSE",
  ONLINE: "ONLINE",
} as const;

export type BranchType = (typeof BranchType)[keyof typeof BranchType];

export const BranchStatus = {
  DRAFT: "DRAFT",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  ARCHIVED: "ARCHIVED",
} as const;

export type BranchStatus = (typeof BranchStatus)[keyof typeof BranchStatus];

export interface BranchDto {
  id: string;

  name: string;

  code: string;

  branchType: BranchType;

  phone?: string;

  email?: string;

  addressLine1?: string;

  city?: string;

  defaultBranch: boolean;

  status: BranchStatus;

  manager: BranchManagerDto | null;

  createdAt: string;

  updatedAt: string;
}
export interface BranchManagerDto {
  id: string;
  firstName: string;
  lastName: string;
}
export interface CreateBranchRequest {
  name: string;
  code: string;
  branchType: BranchType;
  phone?: string;
  email?: string;
  addressLine1?: string;
  city?: string;
  managerId?: string | null;
}

export interface UpdateBranchRequest {
  name?: string;
  phone?: string;
  email?: string;
  addressLine1?: string;
  city?: string;
  managerId?: string | null;
}

export interface UpdateBranchStatusRequest {
  status: BranchStatus;
}

export interface DefaultBranchResponse {
  previousDefaultBranch: BranchDto | null;
  currentDefaultBranch: BranchDto;
}

export interface BranchQueryParams {
  status?: BranchStatus;
  search?: string;
  managerId?: string;
  page?: number;
  size?: number;
  sort?: string;
}
