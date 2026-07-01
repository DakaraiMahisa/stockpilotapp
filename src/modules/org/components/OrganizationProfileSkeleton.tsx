import { Card } from "@/components/ui";
import Skeleton from "@/components/feedback/Skeleton";

export default function OrganizationProfileSkeleton() {
  return (
    <Card className="space-y-8 p-8">
      <Skeleton className="h-8 w-64" />

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-11 w-36" />
      </div>
    </Card>
  );
}
