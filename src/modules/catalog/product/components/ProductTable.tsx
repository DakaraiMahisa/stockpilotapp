import { DollarSign, Pencil, Power, SlidersHorizontal } from "lucide-react";

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

import type { Product, UnitOfMeasure } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  canManageVariants?: boolean;
  canResolvePrice?: boolean;
  onEdit: (product: Product) => void;
  onDeactivate: (product: Product) => void;
  onActivate: (product: Product) => void;
  onManageVariants: (product: Product) => void;
  onResolvePrice: (product: Product) => void;
}

const UNIT_LABELS: Record<UnitOfMeasure, string> = {
  PCS: "Pieces",
  KG: "Kilograms",
  G: "Grams",
  LTR: "Litres",
  ML: "Millilitres",
  BOX: "Box",
  PACK: "Pack",
  ROLL: "Roll",
  MTR: "Metres",
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 3,
  }).format(value);

const ProductTable = ({
  products,
  isLoading = false,
  canManageVariants = false,
  canResolvePrice = false,
  onEdit,
  onDeactivate,
  onActivate,
  onManageVariants,
  onResolvePrice,
}: ProductTableProps) => {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-surface p-6">
        <p className="text-sm text-text-secondary">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface p-10 text-center">
        <p className="font-medium text-text-primary">No products found</p>
        <p className="mt-1 text-sm text-text-secondary">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-surface">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <span className="font-mono text-sm text-text-primary">
                  {product.sku}
                </span>
              </TableCell>

              <TableCell>
                <div className="min-w-40">
                  <p className="font-medium text-text-primary">
                    {product.name}
                  </p>

                  {product.barcode && (
                    <p className="mt-0.5 text-xs text-text-secondary">
                      Barcode: {product.barcode}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <span className="text-text-secondary">
                  {product.categoryName}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-text-secondary">
                  {product.brandName ?? "—"}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-text-secondary">
                  {UNIT_LABELS[product.unitOfMeasure]}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-medium text-text-primary">
                  {formatNumber(product.retailPrice)}
                </span>
              </TableCell>

              <TableCell>
                <span className="text-text-primary">
                  {formatNumber(product.stockQty)}
                </span>
              </TableCell>

              <TableCell>
                <Badge variant={product.active ? "default" : "secondary"}>
                  {product.active ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-2">
                  {canResolvePrice && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<DollarSign className="h-4 w-4" />}
                      onClick={() => onResolvePrice(product)}
                      aria-label={`Resolve price for ${product.name}`}
                    >
                      Price
                    </Button>
                  )}

                  {canManageVariants && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                      onClick={() => onManageVariants(product)}
                      aria-label={`Manage variants for ${product.name}`}
                    >
                      Variants
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Pencil className="h-4 w-4" />}
                    onClick={() => onEdit(product)}
                    aria-label={`Edit ${product.name}`}
                  >
                    Edit
                  </Button>

                  {product.active ? (
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={<Power className="h-4 w-4" />}
                      onClick={() => onDeactivate(product)}
                      aria-label={`Deactivate ${product.name}`}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Power className="h-4 w-4" />}
                      onClick={() => onActivate(product)}
                      aria-label={`Activate ${product.name}`}
                    >
                      Activate
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
