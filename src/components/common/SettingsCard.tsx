import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/Card";

interface SettingsCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

const SettingsCard = ({
  title,
  description,
  children,
  footer,
  className = "",
}: SettingsCardProps) => {
  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>

        {description && (
          <p className="text-sm text-text-secondary">{description}</p>
        )}
      </div>

      <div className="mt-6">{children}</div>

      {footer && (
        <div className="mt-6 flex justify-end border-t border-border pt-4">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default SettingsCard;
