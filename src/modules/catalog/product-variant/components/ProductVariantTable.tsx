import { Pencil, Power, Trash2 } from "lucide-react";

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import type { ProductVariant } from "../types/productVariant.types";

interface ProductVariantTableProps {
  variants: ProductVariant[];
  loading?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
  onEdit: (variant: ProductVariant) => void;
  onDeactivate: (variant: ProductVariant) => void;
  onDelete: (variant: ProductVariant) => void;
}

const ProductVariantTable = ({
  variants,
  loading = false,
  canUpdate = false,
  canDelete = false,
  onEdit,
  onDeactivate,
  onDelete,
}: ProductVariantTableProps) => {
  const showActions = canUpdate || canDelete;

  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-text-secondary">Loading variants...</p>
      </div>
    );
  }

  if (variants.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-text-secondary">No variants found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>SKU</TableHead>
          <TableHead>Attributes</TableHead>
          <TableHead>Barcode</TableHead>
          <TableHead>Cost Price</TableHead>
          <TableHead>Retail Price</TableHead>
          <TableHead>Status</TableHead>

          {showActions && (
            <TableHead className="w-28 text-right">Actions</TableHead>
          )}
        </TableRow>
      </TableHeader>

      <TableBody>
        {variants.map((variant) => (
          <TableRow key={variant.id}>
            <TableCell>
              <span className="font-mono text-sm">{variant.sku}</span>
            </TableCell>

            <TableCell>
              {Object.entries(variant.attributes).length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {Object.entries(variant.attributes).map(([code, value]) => (
                    <span key={code} className="text-sm">
                      {code}: {value}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-text-secondary">—</span>
              )}
            </TableCell>

            <TableCell>
              {variant.barcode ? (
                <span className="font-mono text-sm">{variant.barcode}</span>
              ) : (
                <span className="text-text-secondary">—</span>
              )}
            </TableCell>

            <TableCell>{variant.costPrice.toFixed(2)}</TableCell>

            <TableCell>{variant.retailPrice.toFixed(2)}</TableCell>

            <TableCell>
              <Badge variant={variant.active ? "default" : "secondary"}>
                {variant.active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            {showActions && (
              <TableCell>
                <div className="flex justify-end gap-1">
                  {canUpdate && (
                    <>
                      <Button
                        type="button"
                        aria-label={`Edit ${variant.sku}`}
                        onClick={() => onEdit(variant)}
                      >
                        <Pencil className="size-4" />
                      </Button>

                      {variant.active && (
                        <Button
                          type="button"
                          aria-label={`Deactivate ${variant.sku}`}
                          onClick={() => onDeactivate(variant)}
                        >
                          <Power className="size-4" />
                        </Button>
                      )}
                    </>
                  )}

                  {canDelete && (
                    <Button
                      type="button"
                      aria-label={`Delete ${variant.sku}`}
                      onClick={() => onDelete(variant)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductVariantTable;
