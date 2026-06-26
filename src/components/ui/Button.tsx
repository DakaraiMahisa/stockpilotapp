import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: `
      bg-[var(--brand)]
      hover:bg-[var(--brand-hover)]
      text-white
    `,
    secondary: `
      bg-gray-100
      hover:bg-gray-200
      text-gray-800
    `,
    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
    `,
  };

  return (
    <button
      className={`
        px-4
        py-2
        rounded-lg
        font-medium
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
