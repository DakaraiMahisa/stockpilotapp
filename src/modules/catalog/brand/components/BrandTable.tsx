import { Pencil, Power } from "lucide-react";

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

import type { Brand } from "../types/brand.types";

interface BrandTableProps {
  brands: Brand[];
  loading?: boolean;
  onEdit: (brand: Brand) => void;
  onDeactivate: (brand: Brand) => void;
  onActivate: (brand: Brand) => void;
}

const BrandTable = ({
  brands,
  loading = false,
  onEdit,
  onDeactivate,
  onActivate,
}: BrandTableProps) => {
  if (loading) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">Loading brands...</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="flex min-h-48 items-center justify-center">
        <p className="text-muted-foreground">No brands found.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-24 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {brands.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell className="font-medium">{brand.name}</TableCell>

            <TableCell>
              <span className="font-mono text-sm">{brand.code}</span>
            </TableCell>

            <TableCell>
              {brand.website ? (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {brand.website}
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>

            <TableCell>
              <Badge variant={brand.active ? "default" : "secondary"}>
                {brand.active ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell>
              <div className="flex justify-end gap-1">
                <Button
                  type="button"
                  aria-label={`Edit ${brand.name}`}
                  onClick={() => onEdit(brand)}
                >
                  <Pencil className="size-4" />
                </Button>

                {brand.active ? (
                  <Button
                    type="button"
                    aria-label={`Deactivate ${brand.name}`}
                    onClick={() => onDeactivate(brand)}
                  >
                    <Power className="size-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    aria-label={`Activate ${brand.name}`}
                    onClick={() => onActivate(brand)}
                  >
                    <Power className="size-4" />
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

export default BrandTable;
