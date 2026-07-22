import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;

  options: ReadonlyArray<SelectOption>;

  value?: string;

  placeholder?: string;

  error?: string;

  disabled?: boolean;

  className?: string;

  onChange: (value: string) => void;
}

const Select = ({
  label,
  options,
  value,
  placeholder = "Select an option",
  error,
  disabled = false,
  className,
  onChange,
}: SelectProps) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}

      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm",
          "text-text-primary",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:bg-surface-raised",
          error && "border-danger",
          className,
        )}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Select;
