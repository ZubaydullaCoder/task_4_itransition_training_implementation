// components/admin/users/select-all-checkbox.tsx
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types";

interface SelectAllCheckboxProps {
  users: User[] | undefined;
  selectedUsers: string[];
  onSelectAll: () => void;
}

export function SelectAllCheckbox({
  users,
  selectedUsers,
  onSelectAll,
}: SelectAllCheckboxProps) {
  const isAllSelected =
    users?.length > 0 && selectedUsers.length === users?.length;

  return (
    <Checkbox
      checked={isAllSelected}
      onCheckedChange={onSelectAll}
      aria-label="Select all users"
    />
  );
}
