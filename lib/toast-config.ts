// lib/toast-config.ts
import { toast, ToastPosition, DefaultToastOptions } from "react-hot-toast";

// Extends default toast options with custom styling properties
interface CustomToastOptions extends DefaultToastOptions {
  className?: string;
  style?: React.CSSProperties;
  position?: ToastPosition;
}

// Base configuration for all toasts
export const toastConfig: CustomToastOptions = {
  style: {
    borderRadius: "var(--radius)", // Uses global border radius
    background: "hsl(var(--secondary))", // Uses theme secondary color
    color: "hsl(var(--secondary-foreground))", // Uses theme text color
    zIndex: 100, // Ensures toasts appear above other elements
  },
  position: "top-right", // Position toasts in top-right corner
  className: "toast-message", // Custom class for additional styling
};

// Specific styles for success toasts
const successStyle: CustomToastOptions = {
  style: {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    border: "1px solid hsl(var(--border))",
    zIndex: 100,
  },
  iconTheme: {
    primary: "hsl(var(--primary))", // Success icon color
    secondary: "hsl(var(--primary-foreground))", // Success icon background
  },
};

// Specific styles for error toasts
const errorStyle: CustomToastOptions = {
  style: {
    background: "hsl(var(--destructive) / 0.15)", // Light red background
    color: "hsl(var(--destructive))", // Error text color
    border: "1px solid hsl(var(--destructive) / 0.2)", // Error border
    zIndex: 100,
  },
  iconTheme: {
    primary: "hsl(var(--destructive))", // Error icon color
    secondary: "hsl(var(--destructive-foreground))", // Error icon background
  },
};

// Helper functions to show toasts with consistent styling
export const showSuccessToast = (message: string) => {
  toast.success(message, { ...toastConfig, ...successStyle });
};

export const showErrorToast = (message: string) => {
  toast.error(message, { ...toastConfig, ...errorStyle });
};
