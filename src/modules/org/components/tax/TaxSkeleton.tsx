import { Card } from "@/components/ui";
import Skeleton from "@/components/feedback/Skeleton";

const ROWS = 8;

const TaxSkeleton = () => {
  return (
    <Card>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-72" />

          <Skeleton className="h-10 w-40" />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 border-b pb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <div key={row} className="grid grid-cols-6 items-center gap-4 py-3">
            <Skeleton className="h-4 w-40" /> {/* Name */}
            <Skeleton className="h-4 w-20" /> {/* Code */}
            <Skeleton className="h-4 w-20" /> {/* Type */}
            <Skeleton className="h-4 w-44" /> {/* Current Rates */}
            <Skeleton className="h-4 w-12" /> {/* Default */}
            <Skeleton className="h-8 w-32 justify-self-end" /> {/* Actions */}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TaxSkeleton;
