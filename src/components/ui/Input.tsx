import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId =
      id ?? props.name ?? `input-${Math.random().toString(36).slice(2, 11)}`;

    const errorId = `${inputId}-error`;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full
            rounded-lg
            border
            bg-surface
            text-text-primary
            px-3
            py-2
            transition-colors
            focus:outline-none
            focus:ring-2
            ${
              error
                ? "border-danger focus:ring-danger"
                : "border-border focus:ring-brand"
            }
            ${className ?? ""}
          `}
          {...props}
        />

        {error && (
          <p id={errorId} className="text-sm text-danger">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
