import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];

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
      {label && <label className="block text-sm font-medium">{label}</label>}

      <select
        value={value ?? ""}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:bg-gray-100",
          error && "border-red-500",
          className,
        )}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
