export const TAX_TYPES = ["GST", "VAT", "NONE"] as const;

export type TaxType = (typeof TAX_TYPES)[number];

export const RATE_TYPES = ["CGST", "SGST", "IGST", "VAT"] as const;
export type RateType = (typeof RATE_TYPES)[number];

export interface TaxRateDto {
  id: string;
  rateType: RateType;
  rate: number;
  effectiveFrom: string;
  effectiveTo: string | null;
}

export interface TaxClassDto {
  id: string;
  name: string;
  code: string;
  taxType: TaxType;
  defaultTaxClass: boolean;
  hsnSacCode: string | null;
  description: string | null;
  rates: TaxRateDto[];
}

export interface CreateTaxRateRequest {
  rateType: RateType;
  rate: number;
  effectiveFrom: string;
}

export interface CreateTaxClassRequest {
  name: string;
  code: string;
  taxType: TaxType;
  isDefault: boolean;
  hsnSacCode: string | null;
  description: string | null;
  rates: CreateTaxRateRequest[];
}

export interface UpdateTaxClassRequest {
  name?: string;
  hsnSacCode?: string | null;
  description?: string | null;
}

export interface TaxBreakdownDto {
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  vat: number;
  totalTax: number;
  totalWithTax: number;
}

export interface ResolveTaxParams {
  taxClassId: string;
  amount: number;
  transactionDate: string;
}
