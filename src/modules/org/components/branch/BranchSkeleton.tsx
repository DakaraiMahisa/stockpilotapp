import { Card } from "@/components/ui/index";
import Skeleton from "@/components/feedback/Skeleton";

const ROWS = 8;

const BranchSkeleton = () => {
  return (
    <Card>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />

          <Skeleton className="h-10 w-36" />
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-4 border-b pb-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: ROWS }).map((_, row) => (
          <div key={row} className="grid grid-cols-7 items-center gap-4 py-3">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-24 justify-self-end" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BranchSkeleton;
