import { Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterState {
  status: "all" | "active" | "blocked";
}

interface UserTableFilterProps {
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
}

export function UserTableFilter({
  filterState,
  onFilterChange,
}: UserTableFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-9 ml-2" // Match input height
        >
          <Filter className="h-4 w-4 mr-2" />
          {filterState.status === "all"
            ? "All Status"
            : filterState.status === "active"
            ? "Active"
            : "Blocked"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onFilterChange({ status: "all" })}>
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              filterState.status === "all" ? "opacity-100" : "opacity-0"
            )}
          />
          All Status
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange({ status: "active" })}>
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              filterState.status === "active" ? "opacity-100" : "opacity-0"
            )}
          />
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onFilterChange({ status: "blocked" })}>
          <Check
            className={cn(
              "mr-2 h-4 w-4",
              filterState.status === "blocked" ? "opacity-100" : "opacity-0"
            )}
          />
          Blocked
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
