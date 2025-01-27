// components/admin/users/status-cell.tsx
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LoadingState, User } from "@/types";

interface StatusCellProps {
  user: User;
  loadingState: LoadingState | null;
}

export function StatusCell({ user, loadingState }: StatusCellProps) {
  const isLoading = loadingState?.userIds.includes(user.email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-14">
        <Loader2 className="h-4 w-4 animate-spin text-primary-brand" />
      </div>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        user.status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      )}
    >
      {user.status}
    </span>
  );
}
