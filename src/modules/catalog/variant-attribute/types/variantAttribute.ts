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

export interface CreateVariantAttributeRequest {
  name: string;
  code: string;
  description?: string;
}

export interface UpdateVariantAttributeRequest {
  name: string;
  code: string;
  description?: string;
}

export interface CreateVariantAttributeValueRequest {
  value: string;
  code: string;
  sortOrder: number;
}

export interface UpdateVariantAttributeValueRequest {
  value: string;
  code: string;
  sortOrder: number;
}
