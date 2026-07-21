import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import TaxActions from "./TaxActions";

import type { TaxClassDto } from "../../types/tax.types";

interface TaxTableProps {
  taxClasses: TaxClassDto[];
  loading?: boolean;

  onEdit?: (taxClass: TaxClassDto) => void;
  onAddRate?: (taxClass: TaxClassDto) => void;
  onSetDefault?: (taxClass: TaxClassDto) => void;
}

const TaxTable = ({
  taxClasses,
  loading = false,
  onEdit,
  onAddRate,
  onSetDefault,
}: TaxTableProps) => {
  if (loading) {
    return <p>Loading tax classes...</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Current Rates</TableHead>
          <TableHead>Default</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {taxClasses.map((taxClass) => (
          <TableRow key={taxClass.id}>
            <TableCell className="font-medium">{taxClass.name}</TableCell>

            <TableCell>{taxClass.code}</TableCell>

            <TableCell>{taxClass.taxType}</TableCell>

            <TableCell>
              {taxClass.rates.length === 0
                ? "-"
                : taxClass.rates
                    .filter((rate) => rate.effectiveTo === null)
                    .map(
                      (rate) =>
                        `${rate.rateType} ${Number(rate.rate).toFixed(3)}%`,
                    )
                    .join(", ")}
            </TableCell>

            <TableCell>{taxClass.defaultTaxClass ? "Yes" : "No"}</TableCell>

            <TableCell className="text-right">
              <TaxActions
                taxClass={taxClass}
                onEdit={onEdit}
                onAddRate={onAddRate}
                onSetDefault={onSetDefault}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TaxTable;
