import type { PageResponse } from "@/types/pagination";

export interface Brand {
  id: string;
  name: string;
  code: string;
  logoObjectKey: string | null;
  website: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrandSummary {
  id: string;
  name: string;
  code: string;
}

export interface BrandCreateRequest {
  name: string;
  code: string;
  logoObjectKey?: string;
  website?: string;
}

export interface BrandUpdateRequest {
  name?: string;
  code?: string;
  logoObjectKey?: string;
  website?: string;
  active?: boolean;
}

export interface BrandListParams {
  search?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}

export type BrandPageResponse = PageResponse<Brand>;
