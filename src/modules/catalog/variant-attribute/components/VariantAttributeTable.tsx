import { ListPlus, Pencil, Power, Trash2 } from "lucide-react";

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
import { PERMISSIONS } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";

import type { VariantAttribute } from "../types/variantAttribute";

interface VariantAttributeTableProps {
  attributes: VariantAttribute[];
  loading?: boolean;
  onEdit: (attribute: VariantAttribute) => void;
  onManageValues: (attribute: VariantAttribute) => void;
  onActivate: (attribute: VariantAttribute) => void;
  onDeactivate: (attribute: VariantAttribute) => void;
  onDelete: (attribute: VariantAttribute) => void;
}

const VariantAttributeTable = ({
  attributes,
  loading = false,
  onEdit,
  onManageValues,
  onActivate,
  onDeactivate,
  onDelete,
}: VariantAttributeTableProps) => {
  const { hasPermission } = usePermissions();

  const canUpdate = hasPermission(PERMISSIONS.PRODUCT_VARIANT_UPDATE);

  const canDelete = hasPermission(PERMISSIONS.PRODUCT_VARIANT_DELETE);

  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">Loading variant attributes...</p>
      </div>
    );
  }

  if (attributes.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">No variant attributes found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Values</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-40 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {attributes.map((attribute) => (
          <TableRow key={attribute.id}>
            <TableCell className="font-medium">{attribute.name}</TableCell>

            <TableCell>
              <span className="font-mono text-sm">{attribute.code}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm text-muted-foreground">
                {attribute.values.length}
              </span>
            </TableCell>

            <TableCell>
              <Badge variant={attribute.active ? "default" : "secondary"}>
                {attribute.active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex justify-end gap-1">
                {canUpdate && (
                  <>
                    <Button
                      type="button"
                      aria-label={`Edit ${attribute.name}`}
                      onClick={() => onEdit(attribute)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      aria-label={`Manage values for ${attribute.name}`}
                      onClick={() => onManageValues(attribute)}
                    >
                      <ListPlus className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      aria-label={
                        attribute.active
                          ? `Deactivate ${attribute.name}`
                          : `Activate ${attribute.name}`
                      }
                      onClick={() =>
                        attribute.active
                          ? onDeactivate(attribute)
                          : onActivate(attribute)
                      }
                    >
                      <Power className="size-4" />
                    </Button>
                  </>
                )}

                {canDelete && (
                  <Button
                    type="button"
                    variant="danger"
                    aria-label={`Delete ${attribute.name}`}
                    onClick={() => onDelete(attribute)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VariantAttributeTable;
