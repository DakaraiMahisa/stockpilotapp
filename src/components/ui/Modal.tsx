import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  onClose: () => void;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

const Modal = ({
  open,
  title,
  description,
  children,
  size = "md",
  closeOnOverlayClick = true,
  onClose,
}: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose();
        }
      }}
    >
      <div
        className={`w-full rounded-xl bg-white shadow-xl ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || description) && (
          <div className="border-b px-6 py-5">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}

            {description && (
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
