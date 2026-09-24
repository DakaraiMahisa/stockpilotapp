import type { PageResponse } from "@/types/pagination";

export type UnitOfMeasure =
  | "PCS"
  | "KG"
  | "G"
  | "LTR"
  | "ML"
  | "BOX"
  | "PACK"
  | "ROLL"
  | "MTR";

export interface Product {
  id: string;
  sku: string;
  barcode: string | null;
  name: string;
  description: string | null;

  categoryId: string;
  categoryName: string;

  brandId: string | null;
  brandName: string | null;

  taxClassId: string;
  taxClassName: string;

  unitOfMeasure: UnitOfMeasure;

  trackBatches: boolean;
  minStockLevel: number;
  maxStockLevel: number;

  service: boolean;
  weightKg: number | null;

  notes: string | null;

  retailPrice: number;
  stockQty: number;

  active: boolean;
}

export interface ProductCreateRequest {
  sku?: string;
  barcode?: string;
  name: string;
  description?: string;

  brandId?: string;
  categoryId: string;
  taxClassId: string;

  unitOfMeasure: UnitOfMeasure;

  trackBatches?: boolean;
  minStockLevel?: number;
  maxStockLevel?: number;

  service?: boolean;
  weightKg?: number;

  notes?: string;
}

export interface ProductUpdateRequest {
  barcode?: string;
  name?: string;
  description?: string;

  brandId?: string;
  categoryId?: string;
  taxClassId?: string;

  unitOfMeasure?: UnitOfMeasure;

  trackBatches?: boolean;
  minStockLevel?: number;
  maxStockLevel?: number;

  active?: boolean;
  service?: boolean;
  weightKg?: number;

  notes?: string;
}

export interface ProductListParams {
  search?: string;
  categoryId?: string;
  brandId?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}

export type ProductPageResponse = PageResponse<Product>;
