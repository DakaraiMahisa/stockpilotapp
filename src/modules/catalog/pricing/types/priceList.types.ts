export type PriceListType =
  | "RETAIL"
  | "WHOLESALE"
  | "STAFF"
  | "SPECIAL"
  | "PROMOTIONAL";

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
  createdAt: string;
  updatedAt: string;
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
  productId?: string;
  variantId?: string;
  minQuantity: number;
  unitPrice: number;
  discountPct?: number;
}
