import { useState } from "react";
import { Plus, X } from "lucide-react";

import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import EmptyState from "@/components/feedback/EmptyState";
import Skeleton from "@/components/feedback/Skeleton";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import {
  useAssignVariantAttribute,
  useProductVariantAttributes,
  useRemoveVariantAttribute,
} from "../hooks/useProductVariant";

import { useVariantAttributes } from "@/modules/catalog/variant-attribute/hooks/useVariantAttributes";

interface ProductVariantAttributeManagerProps {
  productId: string;
}

const ProductVariantAttributeManager = ({
  productId,
}: ProductVariantAttributeManagerProps) => {
  const { hasPermission } = usePermissions();

  const canRead = hasPermission(PERMISSIONS.PRODUCT_VARIANT_READ);
  const canCreate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_CREATE);
  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const [removingAttributeId, setRemovingAttributeId] = useState<string | null>(
    null,
  );

  const assignedQuery = useProductVariantAttributes(productId);
  const allAttributesQuery = useVariantAttributes();

  const assignMutation = useAssignVariantAttribute();
  const removeMutation = useRemoveVariantAttribute();

  const assignedAttributes = assignedQuery.data?.data ?? [];

  const allAttributes = allAttributesQuery.data?.data ?? [];

  const assignedAttributeIds = new Set(
    assignedAttributes.map((attribute) => attribute.id),
  );

  const availableAttributes = allAttributes.filter(
    (attribute) => attribute.active && !assignedAttributeIds.has(attribute.id),
  );

  if (!canRead) {
    return null;
  }

  const isLoading = assignedQuery.isLoading || allAttributesQuery.isLoading;

  const isError = assignedQuery.isError || allAttributesQuery.isError;

  const handleAssign = (attributeId: string) => {
    assignMutation.mutate({
      productId,
      attributeId,
    });
  };

  const handleRemove = (attributeId: string) => {
    setRemovingAttributeId(attributeId);

    removeMutation.mutate(
      {
        productId,
        attributeId,
      },
      {
        onSettled: () => {
          setRemovingAttributeId(null);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Unable to load variant attributes"
        description="The variant attributes for this product could not be loaded. Please try again."
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Assigned attributes */}
      <section className="space-y-3">
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            Assigned Attributes
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            These attributes are available when defining variants for this
            product.
          </p>
        </div>

        {assignedAttributes.length === 0 ? (
          <EmptyState
            title="No attributes assigned"
            description="Assign reusable attributes to this product before creating its variants."
          />
        ) : (
          <div className="overflow-hidden rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Values</TableHead>
                  {canUpdate && (
                    <TableHead className="text-right">Action</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {assignedAttributes.map((attribute) => (
                  <TableRow key={attribute.id}>
                    <TableCell className="font-medium text-text-primary">
                      {attribute.name}
                    </TableCell>

                    <TableCell className="text-text-secondary">
                      {attribute.code}
                    </TableCell>

                    <TableCell>
                      <TableCell>
                        <Badge
                          variant={attribute.active ? "default" : "secondary"}
                        >
                          {attribute.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableCell>

                    <TableCell className="text-text-secondary">
                      {attribute.values.length}
                    </TableCell>

                    {canUpdate && (
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="secondary"
                          disabled={removingAttributeId === attribute.id}
                          onClick={() => handleRemove(attribute.id)}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Remove
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* Available attributes */}
      {canCreate && (
        <section className="space-y-3">
          <div>
            <h3 className="text-base font-semibold text-text-primary">
              Available Attributes
            </h3>

            <p className="mt-1 text-sm text-text-secondary">
              Assign reusable attributes that this product can use for its
              variants.
            </p>
          </div>

          {availableAttributes.length === 0 ? (
            <EmptyState
              title="No available attributes"
              description="All active variant attributes are already assigned to this product."
            />
          ) : (
            <div className="overflow-hidden rounded-lg border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Values</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {availableAttributes.map((attribute) => (
                    <TableRow key={attribute.id}>
                      <TableCell className="font-medium text-text-primary">
                        {attribute.name}
                      </TableCell>

                      <TableCell className="text-text-secondary">
                        {attribute.code}
                      </TableCell>

                      <TableCell className="text-text-secondary">
                        {attribute.values.length}
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={assignMutation.isPending}
                          onClick={() => handleAssign(attribute.id)}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default ProductVariantAttributeManager;
