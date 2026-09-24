export interface VariantAttributeValue {
  id: string;
  attributeId: string;
  value: string;
  code: string;
  active: boolean;
  sortOrder: number;
}

export interface VariantAttribute {
  id: string;
  name: string;
  code: string;
  description: string | null;
  active: boolean;
  values: VariantAttributeValue[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  barcode: string | null;
  attributes: Record<string, string>;
  costPrice: number;
  retailPrice: number;
  imageUrl: string | null;
  active: boolean;
  additionalWeightKg: number;
}

export interface ProductVariantCreateRequest {
  attributes: Record<string, string>;
  barcode: string;
  costPrice: number;
  retailPrice: number;
  imageUrl?: string;
  additionalWeightKg?: number;
}

export interface ProductVariantUpdateRequest {
  barcode?: string;
  costPrice?: number;
  retailPrice?: number;
  imageUrl?: string;
  additionalWeightKg?: number;
  active?: boolean;
}
