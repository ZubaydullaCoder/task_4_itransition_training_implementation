// lib/toast-config.ts
import { toast, ToastOptions } from "react-hot-toast";

export const toastConfig: ToastOptions = {
  style: {
    borderRadius: "var(--radius)",
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    zIndex: 100, // Add higher z-index
  },
  position: "top-right", // Ensure consistent positioning
  toastOptions: {
    // Custom class name for the toast container
    className: "toast-message",
  },
  success: {
    style: {
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
      border: "1px solid hsl(var(--border))",
      zIndex: 100, // Add higher z-index
    },
    iconTheme: {
      primary: "hsl(var(--primary))",
      secondary: "hsl(var(--primary-foreground))",
    },
  },
  error: {
    style: {
      background: "hsl(var(--destructive) / 0.15)",
      color: "hsl(var(--destructive))",
      border: "1px solid hsl(var(--destructive) / 0.2)",
      zIndex: 100, // Add higher z-index
    },
    iconTheme: {
      primary: "hsl(var(--destructive))",
      secondary: "hsl(var(--destructive-foreground))",
    },
  },
};

// Custom toast functions
export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};
