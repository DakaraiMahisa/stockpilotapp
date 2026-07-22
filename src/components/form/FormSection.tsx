import { type ReactNode } from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function FormSection({
  title,
  description,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section className={`space-y-6 ${className}`}>
      <div>
        <h2 className="text-lg font-semibold 	text-text-primary">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}
