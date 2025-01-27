import { toast, ToastPosition, DefaultToastOptions } from "react-hot-toast";

interface CustomToastOptions extends DefaultToastOptions {
  className?: string;
  style?: React.CSSProperties;
  position?: ToastPosition;
}

export const toastConfig: CustomToastOptions = {
  style: {
    borderRadius: "var(--radius)",
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    zIndex: 100,
  },
  position: "top-right",
  className: "toast-message",
};

const successStyle: CustomToastOptions = {
  style: {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    border: "1px solid hsl(var(--border))",
    zIndex: 100,
  },
  iconTheme: {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--primary-foreground))",
  },
};

const errorStyle: CustomToastOptions = {
  style: {
    background: "hsl(var(--destructive) / 0.15)",
    color: "hsl(var(--destructive))",
    border: "1px solid hsl(var(--destructive) / 0.2)",
    zIndex: 100,
  },
  iconTheme: {
    primary: "hsl(var(--destructive))",
    secondary: "hsl(var(--destructive-foreground))",
  },
};

export const showSuccessToast = (message: string) => {
  toast.success(message, { ...toastConfig, ...successStyle });
};

export const showErrorToast = (message: string) => {
  toast.error(message, { ...toastConfig, ...errorStyle });
};
