import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      richColors
      closeButton
      position="top-right"
      expand={false}
      duration={4000}
      style={
        {
          "--normal-bg": "var(--color-surface)",
          "--normal-text": "var(--color-text-primary)",
          "--normal-border": "var(--color-border)",

          "--success-bg": "var(--color-success-tint)",
          "--success-text": "var(--color-success)",
          "--success-border": "var(--color-success)",

          "--error-bg": "var(--color-danger-tint)",
          "--error-text": "var(--color-danger)",
          "--error-border": "var(--color-danger)",

          "--warning-bg": "var(--color-warning-tint)",
          "--warning-text": "var(--color-warning)",
          "--warning-border": "var(--color-warning)",
        } as React.CSSProperties
      }
    />
  );
}
