import { useState } from "react";

import Button from "@/components/ui/Button";
import FormSection from "@/components/form/FormSection";
import Input from "@/components/ui/Input";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import { useCreatePriceList, useUpdatePriceList } from "../hooks/usePriceLists";

import type {
  CreatePriceListRequest,
  PriceList,
  PriceListType,
} from "../types/priceList.types";

interface PriceListFormProps {
  priceList?: PriceList | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormState {
  name: string;
  code: string;
  priceListType: PriceListType;
  validFrom: string;
  validTo: string;
  defaultList: boolean;
  active: boolean;
}

const createInitialState = (priceList?: PriceList | null): FormState => ({
  name: priceList?.name ?? "",
  code: priceList?.code ?? "",
  priceListType: priceList?.priceListType ?? "RETAIL",
  validFrom: priceList?.validFrom ?? "",
  validTo: priceList?.validTo ?? "",
  defaultList: priceList?.defaultList ?? false,
  active: priceList?.active ?? true,
});

const PRICE_LIST_TYPES: PriceListType[] = [
  "RETAIL",
  "WHOLESALE",
  "STAFF",
  "SPECIAL",
  "PROMOTIONAL",
];

export function PriceListForm({
  priceList,
  onSuccess,
  onCancel,
}: PriceListFormProps) {
  const { hasPermission } = usePermissions();

  const canCreate = hasPermission(PERMISSIONS.CATALOG_PRICING_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.CATALOG_PRICING_UPDATE);

  const isEditing = Boolean(priceList);
  const canSubmit = isEditing ? canUpdate : canCreate;

  const createMutation = useCreatePriceList();
  const updateMutation = useUpdatePriceList();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [form, setForm] = useState<FormState>(() =>
    createInitialState(priceList),
  );

  const handleChange = (field: keyof FormState, value: string | boolean) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || isSubmitting) {
      return;
    }

    const request: CreatePriceListRequest = {
      name: form.name.trim(),
      code: form.code.trim(),
      priceListType: form.priceListType,
      validFrom: form.validFrom || undefined,
      validTo: form.validTo || undefined,
      defaultList: form.defaultList,
      active: form.active,
    };

    try {
      if (isEditing && priceList) {
        await updateMutation.mutateAsync({
          priceListId: priceList.id,
          request: {
            name: request.name,
            priceListType: request.priceListType,
            validFrom: request.validFrom,
            validTo: request.validTo,
            defaultList: request.defaultList,
            active: request.active,
          },
        });
      } else {
        await createMutation.mutateAsync(request);
      }

      onSuccess?.();
    } catch {
      // Global API error handling.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        title={isEditing ? "Edit Price List" : "Create Price List"}
        description={
          isEditing
            ? "Update the pricing list configuration."
            : "Create a price list that defines how product prices are applied."
        }
      >
        <div className="space-y-4">
          <Input
            id="price-list-name"
            name="name"
            label="Name"
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="e.g. Retail Prices"
            maxLength={100}
            required
            disabled={!canSubmit || isSubmitting}
          />

          <Input
            id="price-list-code"
            name="code"
            label="Code"
            value={form.code}
            onChange={(event) => handleChange("code", event.target.value)}
            placeholder="e.g. RETAIL"
            maxLength={20}
            pattern="[A-Za-z0-9_-]+"
            required
            disabled={!canSubmit || isSubmitting}
          />

          <div className="space-y-1">
            <label htmlFor="price-list-type" className="text-sm font-medium">
              Price List Type
            </label>

            <select
              id="price-list-type"
              name="priceListType"
              value={form.priceListType}
              onChange={(event) =>
                handleChange(
                  "priceListType",
                  event.target.value as PriceListType,
                )
              }
              disabled={!canSubmit || isSubmitting}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              required
            >
              {PRICE_LIST_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="price-list-valid-from"
              name="validFrom"
              label="Valid From"
              type="date"
              value={form.validFrom}
              onChange={(event) =>
                handleChange("validFrom", event.target.value)
              }
              disabled={!canSubmit || isSubmitting}
            />

            <Input
              id="price-list-valid-to"
              name="validTo"
              label="Valid To"
              type="date"
              value={form.validTo}
              onChange={(event) => handleChange("validTo", event.target.value)}
              disabled={!canSubmit || isSubmitting}
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.defaultList}
                onChange={(event) =>
                  handleChange("defaultList", event.target.checked)
                }
                disabled={!canSubmit || isSubmitting}
              />
              <span>Default price list</span>
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) =>
                  handleChange("active", event.target.checked)
                }
                disabled={!canSubmit || isSubmitting}
              />
              <span>Active</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={!canSubmit}
          >
            {isEditing ? "Save Changes" : "Create Price List"}
          </Button>
        </div>
      </FormSection>
    </form>
  );
}
