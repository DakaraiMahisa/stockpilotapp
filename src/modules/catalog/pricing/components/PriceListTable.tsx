import { Pencil, Power, Settings2, Trash2 } from "lucide-react";

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

import type { PriceList } from "../types/priceList.types";

interface PriceListTableProps {
  priceLists: PriceList[];
  loading?: boolean;
  onEdit: (priceList: PriceList) => void;
  onManageItems: (priceList: PriceList) => void;
  onActivate: (priceList: PriceList) => void;
  onDeactivate: (priceList: PriceList) => void;
  onDelete: (priceList: PriceList) => void;
}

const PRICE_LIST_TYPE_LABELS: Record<PriceList["priceListType"], string> = {
  RETAIL: "Retail",
  WHOLESALE: "Wholesale",
  STAFF: "Staff",
  SPECIAL: "Special",
  PROMOTIONAL: "Promotional",
};

const PriceListTable = ({
  priceLists,
  loading = false,
  onEdit,
  onManageItems,
  onActivate,
  onDeactivate,
  onDelete,
}: PriceListTableProps) => {
  const { hasPermission } = usePermissions();

  const canUpdate = hasPermission(PERMISSIONS.CATALOG_PRICING_UPDATE);

  const canDelete = hasPermission(PERMISSIONS.CATALOG_PRICING_DELETE);

  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">Loading price lists...</p>
      </div>
    );
  }

  if (priceLists.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">No price lists found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Validity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-44 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {priceLists.map((priceList) => (
          <TableRow key={priceList.id}>
            <TableCell className="font-medium">{priceList.name}</TableCell>

            <TableCell>
              <span className="font-mono text-sm">{priceList.code}</span>
            </TableCell>

            <TableCell>
              {PRICE_LIST_TYPE_LABELS[priceList.priceListType]}
            </TableCell>

            <TableCell>
              <span className="font-mono text-sm">
                {priceList.currencyCode}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm text-muted-foreground">
                {priceList.validFrom ?? "—"} → {priceList.validTo ?? "—"}
              </span>
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                {priceList.defaultList && (
                  <Badge variant="secondary">Default</Badge>
                )}

                <Badge variant={priceList.active ? "default" : "secondary"}>
                  {priceList.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </TableCell>

            <TableCell>
              <div className="flex justify-end gap-1">
                {canUpdate && (
                  <>
                    <Button
                      type="button"
                      aria-label={`Edit ${priceList.name}`}
                      onClick={() => onEdit(priceList)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      aria-label={`Manage items for ${priceList.name}`}
                      onClick={() => onManageItems(priceList)}
                    >
                      <Settings2 className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      aria-label={
                        priceList.active
                          ? `Deactivate ${priceList.name}`
                          : `Activate ${priceList.name}`
                      }
                      onClick={() =>
                        priceList.active
                          ? onDeactivate(priceList)
                          : onActivate(priceList)
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
                    aria-label={`Delete ${priceList.name}`}
                    onClick={() => onDelete(priceList)}
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

export default PriceListTable;
