// components/admin/users/sort-button.tsx
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortConfig, User } from "@/types";

interface SortButtonProps {
  field: keyof User;
  children: React.ReactNode;
  sortConfig: SortConfig;
  onSort: (field: keyof User) => void;
}

export function SortButton({
  field,
  children,
  sortConfig,
  onSort,
}: SortButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => onSort(field)}
      className="flex items-center gap-1 relative w-full justify-between"
    >
      <span className="flex items-center gap-2">
        {children}
        <div className="flex items-center gap-1">
          <ArrowUpDown
            className={cn(
              "h-4 w-4 transition-transform",
              sortConfig.field === field && "text-primary-brand",
              sortConfig.field === field && "rotate-180"
            )}
          />
        </div>
      </span>
      {sortConfig.field === field && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-brand" />
      )}
    </Button>
  );
}
