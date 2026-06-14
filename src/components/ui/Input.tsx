import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium">{label}</label>

        <input
          ref={ref}
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            px-3
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          {...props}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
