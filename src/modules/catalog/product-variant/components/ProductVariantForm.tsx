import { useMemo, useState } from "react";

import { Button, Input, Select } from "@/components/ui";

import type {
  ProductVariant,
  ProductVariantCreateRequest,
  ProductVariantUpdateRequest,
  VariantAttribute,
} from "../types/productVariant.types";

interface ProductVariantFormProps {
  attributes: VariantAttribute[];
  variant?: ProductVariant | null;
  loading?: boolean;
  submitting?: boolean;
  onSubmit: (
    data: ProductVariantCreateRequest | ProductVariantUpdateRequest,
  ) => void;
  onCancel: () => void;
}

const ProductVariantForm = ({
  attributes,
  variant = null,
  loading = false,
  submitting = false,
  onSubmit,
  onCancel,
}: ProductVariantFormProps) => {
  const isEditMode = Boolean(variant);

  const activeAttributes = useMemo(
    () => attributes.filter((attribute) => attribute.active),
    [attributes],
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<string, string>
  >(() => variant?.attributes ?? {});

  const [barcode, setBarcode] = useState(() => variant?.barcode ?? "");

  const [costPrice, setCostPrice] = useState(() =>
    variant ? String(variant.costPrice) : "",
  );

  const [retailPrice, setRetailPrice] = useState(() =>
    variant ? String(variant.retailPrice) : "",
  );

  const [imageUrl, setImageUrl] = useState(() => variant?.imageUrl ?? "");

  const [additionalWeightKg, setAdditionalWeightKg] = useState(() =>
    variant && variant.additionalWeightKg > 0
      ? String(variant.additionalWeightKg)
      : "",
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAttributeChange = (attributeCode: string, valueCode: string) => {
    setSelectedAttributes((current) => ({
      ...current,
      [attributeCode]: valueCode,
    }));

    setErrors((current) => {
      const next = { ...current };
      delete next[attributeCode];
      return next;
    });
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};

    activeAttributes.forEach((attribute) => {
      if (!selectedAttributes[attribute.code]) {
        nextErrors[attribute.code] = `${attribute.name} is required.`;
      }
    });

    if (!barcode.trim()) {
      nextErrors.barcode = "Barcode is required.";
    } else if (barcode.trim().length > 60) {
      nextErrors.barcode = "Barcode must not exceed 60 characters.";
    }

    if (!costPrice.trim()) {
      nextErrors.costPrice = "Cost price is required.";
    } else if (!Number.isFinite(Number(costPrice)) || Number(costPrice) < 0) {
      nextErrors.costPrice = "Cost price must be a valid non-negative number.";
    }

    if (!retailPrice.trim()) {
      nextErrors.retailPrice = "Retail price is required.";
    } else if (
      !Number.isFinite(Number(retailPrice)) ||
      Number(retailPrice) < 0
    ) {
      nextErrors.retailPrice =
        "Retail price must be a valid non-negative number.";
    }

    if (
      costPrice.trim() &&
      retailPrice.trim() &&
      Number.isFinite(Number(costPrice)) &&
      Number.isFinite(Number(retailPrice)) &&
      Number(retailPrice) < Number(costPrice)
    ) {
      nextErrors.retailPrice =
        "Retail price must be greater than or equal to cost price.";
    }

    if (
      additionalWeightKg.trim() &&
      (!Number.isFinite(Number(additionalWeightKg)) ||
        Number(additionalWeightKg) < 0)
    ) {
      nextErrors.additionalWeightKg =
        "Additional weight must be a valid non-negative number.";
    }

    if (imageUrl.trim().length > 500) {
      nextErrors.imageUrl = "Image URL must not exceed 500 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    if (isEditMode) {
      const request: ProductVariantUpdateRequest = {
        barcode: barcode.trim(),
        costPrice: Number(costPrice),
        retailPrice: Number(retailPrice),
        imageUrl: imageUrl.trim() || undefined,
        additionalWeightKg: additionalWeightKg.trim()
          ? Number(additionalWeightKg)
          : undefined,
      };

      onSubmit(request);
      return;
    }

    const request: ProductVariantCreateRequest = {
      attributes: selectedAttributes,
      barcode: barcode.trim(),
      costPrice: Number(costPrice),
      retailPrice: Number(retailPrice),
      imageUrl: imageUrl.trim() || undefined,
      additionalWeightKg: additionalWeightKg.trim()
        ? Number(additionalWeightKg)
        : undefined,
    };

    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="space-y-4">
        <div>
          <h3 className="text-base font-medium text-text-primary">
            Variant Attributes
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Select a value for each configured product attribute.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-32 items-center justify-center">
            <p className="text-text-secondary">Loading attributes...</p>
          </div>
        ) : activeAttributes.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface-raised p-4">
            <p className="text-sm text-text-secondary">
              No active variant attributes have been configured for this
              product.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {activeAttributes.map((attribute) => {
              const options = attribute.values
                .filter((value) => value.active)
                .map((value) => ({
                  label: value.value,
                  value: value.code,
                }));

              return (
                <Select
                  key={attribute.id}
                  label={attribute.name}
                  options={options}
                  value={selectedAttributes[attribute.code] ?? ""}
                  placeholder={`Select ${attribute.name}`}
                  error={errors[attribute.code]}
                  disabled={submitting}
                  onChange={(value) =>
                    handleAttributeChange(attribute.code, value)
                  }
                />
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-base font-medium text-text-primary">
            Variant Details
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Barcode"
            value={barcode}
            onChange={(event) => setBarcode(event.target.value)}
            placeholder="Enter barcode"
            maxLength={60}
            error={errors.barcode}
            disabled={submitting}
          />

          <Input
            label="Image URL"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            placeholder="https://..."
            maxLength={500}
            error={errors.imageUrl}
            disabled={submitting}
          />

          <Input
            label="Cost Price"
            type="number"
            min="0"
            step="0.01"
            value={costPrice}
            onChange={(event) => setCostPrice(event.target.value)}
            placeholder="0.00"
            error={errors.costPrice}
            disabled={submitting}
          />

          <Input
            label="Retail Price"
            type="number"
            min="0"
            step="0.01"
            value={retailPrice}
            onChange={(event) => setRetailPrice(event.target.value)}
            placeholder="0.00"
            error={errors.retailPrice}
            disabled={submitting}
          />

          <Input
            label="Additional Weight (kg)"
            type="number"
            min="0"
            step="0.001"
            value={additionalWeightKg}
            onChange={(event) => setAdditionalWeightKg(event.target.value)}
            placeholder="0.000"
            error={errors.additionalWeightKg}
            disabled={submitting}
          />
        </div>
      </section>

      <div className="flex justify-end gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={submitting}
          disabled={loading || activeAttributes.length === 0}
        >
          {isEditMode ? "Save Changes" : "Create Variant"}
        </Button>
      </div>
    </form>
  );
};

export default ProductVariantForm;
