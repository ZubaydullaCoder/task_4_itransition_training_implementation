// lib/toast-config.ts
import { toast, ToastOptions } from "react-hot-toast";

export const toastConfig: ToastOptions = {
  style: {
    borderRadius: "var(--radius)",
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
  },
  success: {
    style: {
      background: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
      border: "1px solid hsl(var(--border))",
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
