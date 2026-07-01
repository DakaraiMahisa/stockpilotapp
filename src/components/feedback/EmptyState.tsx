import { type ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
