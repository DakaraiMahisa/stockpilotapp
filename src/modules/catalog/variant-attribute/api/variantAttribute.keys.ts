export const variantAttributeKeys = {
  all: ["variant-attributes"] as const,

  lists: () => [...variantAttributeKeys.all, "list"] as const,

  list: () => [...variantAttributeKeys.lists()] as const,

  details: () => [...variantAttributeKeys.all, "detail"] as const,

  detail: (attributeId: string) =>
    [...variantAttributeKeys.details(), attributeId] as const,

  values: () => [...variantAttributeKeys.all, "values"] as const,

  valueList: (attributeId: string) =>
    [...variantAttributeKeys.values(), attributeId] as const,

  valueDetail: (attributeId: string, valueId: string) =>
    [...variantAttributeKeys.values(), attributeId, valueId] as const,
};
