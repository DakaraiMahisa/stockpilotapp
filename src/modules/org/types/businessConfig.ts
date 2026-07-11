export const CURRENCY_POSITIONS = ["PREFIX", "SUFFIX"] as const;

export const TIME_FORMATS = ["H12", "H24"] as const;

export const NUMBER_FORMATS = ["DOT_COMMA", "COMMA_DOT"] as const;

export const WEIGHT_UNITS = ["KG", "LB"] as const;

export const DIMENSION_UNITS = ["CM", "IN"] as const;

export type CurrencyPosition = (typeof CURRENCY_POSITIONS)[number];

export type TimeFormat = (typeof TIME_FORMATS)[number];

export type NumberFormat = (typeof NUMBER_FORMATS)[number];

export type WeightUnit = (typeof WEIGHT_UNITS)[number];

export type DimensionUnit = (typeof DIMENSION_UNITS)[number];
export interface BusinessConfigDto {
  id: string;

  timezone: string;

  currencyCode: string;

  currencySymbol: string;

  currencyPosition: CurrencyPosition;

  dateFormat: string;

  timeFormat: TimeFormat;

  numberFormat: NumberFormat;

  decimalPlaces: number;

  fiscalYearStart: string;

  defaultLanguage: string;

  weightUnit: WeightUnit;

  dimensionUnit: DimensionUnit;
}

export interface BusinessConfigUpdateRequest {
  timezone: string;

  currencyCode: string;

  currencySymbol: string;

  currencyPosition: CurrencyPosition;

  dateFormat: string;

  timeFormat: TimeFormat;

  numberFormat: NumberFormat;

  decimalPlaces: number;

  fiscalYearStart: string;

  defaultLanguage: string;

  weightUnit: WeightUnit;

  dimensionUnit: DimensionUnit;
}

export const businessConfigKeys = {
  all: ["business-config"] as const,

  detail: () => [...businessConfigKeys.all, "detail"] as const,
};
