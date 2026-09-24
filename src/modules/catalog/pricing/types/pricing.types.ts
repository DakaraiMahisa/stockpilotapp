import type { PriceListType } from "@/modules/catalog/pricing/types/priceList.types";

export interface PriceResolveRequest {
  productId: string;
  variantId?: string;
  quantity: number;
  date?: string;
}

export interface PriceResolveResponse {
  priceListId: string;
  priceListCode: string;
  currencyCode: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  discountPct: number;
  effectiveUnitPrice: number;
}

export interface PriceList {
  id: string;
  name: string;
  code: string;
  priceListType: PriceListType;
  currencyCode: string;
  validFrom: string | null;
  validTo: string | null;
  defaultList: boolean;
  active: boolean;
}

export interface CreatePriceListRequest {
  name: string;
  code: string;
  priceListType: PriceListType;
  validFrom?: string;
  validTo?: string;
  defaultList: boolean;
  active: boolean;
}

export interface UpdatePriceListRequest {
  name: string;
  priceListType: PriceListType;
  validFrom?: string;
  validTo?: string;
  defaultList: boolean;
  active: boolean;
}

export interface PriceListItem {
  id: string;
  priceListId: string;
  productId: string;
  variantId: string | null;
  minQuantity: number;
  unitPrice: number;
  discountPct: number | null;
}

export interface PriceListItemRequest {
  productId: string;
  variantId?: string;
  minQuantity: number;
  unitPrice: number;
  discountPct?: number;
}
