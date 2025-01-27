// components/admin/users/action-button.tsx
import { forwardRef, ButtonHTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonVariant } from "@/types";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: "default" | "sm" | "lg" | "icon";
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ icon, loading, children, ...props }, ref) => (
    <Button ref={ref} {...props}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </Button>
  )
);
ActionButton.displayName = "ActionButton";
