import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max: number;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Progress({
  value,
  max,
  showLabel = false,
  size = "md",
  className,
}: ProgressProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  const height = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  }[size];

  return (
    <div className={cn("space-y-2", className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span>
            {value} / {max}
          </span>

          <span className="text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div
        className={cn("w-full overflow-hidden rounded-full bg-muted", height)}
      >
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-300 ease-in-out",
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Progress;
