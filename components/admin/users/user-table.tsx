"use client";

import {
  useState,
  useCallback,
  forwardRef,
  ButtonHTMLAttributes,
  useMemo,
} from "react";
import { useUsers } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/admin/users/user-avatar";
import { LastSeenIndicator } from "@/components/admin/users/last-seen-indicator";
import {
  Loader2,
  MoreVertical,
  Search,
  Download,
  Plus,
  ArrowUpDown,
  ShieldOff,
  UserX,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserActions } from "@/hooks/useUserActions";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";

import { UserTableFilter } from "./user-table-filter";

interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Blocked";
  createdAt: string;
}

interface SortConfig {
  field: keyof User;
  direction: "asc" | "desc";
}

interface LoadingState {
  type: "block" | "unblock" | "delete";
  userIds: string[];
}

interface FilterState {
  status: "all" | "active" | "blocked";
}

const getUserStatus = (lastLogin: string): "online" | "offline" | "away" => {
  const lastLoginDate = new Date(lastLogin);
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - lastLoginDate.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 5) return "online";
  if (diffInMinutes < 30) return "away";
  return "offline";
};

// Wrap the button component with forwardRef
const ActionButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactNode;
    loading?: boolean;
    variant?:
      | "default"
      | "destructive"
      | "outline"
      | "secondary"
      | "ghost"
      | "link";
    size?: "default" | "sm" | "lg" | "icon";
  }
>(({ icon, loading, children, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
    {children}
  </Button>
));
ActionButton.displayName = "ActionButton";

const StatusCell = ({
  user,
  loadingState,
}: {
  user: User;
  loadingState: LoadingState | null;
}) => {
  const isLoading = loadingState?.userIds.includes(user.email);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-20">
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
};

export function UserTable() {
  const router = useRouter();
  const { data: session } = useSession();
  const { blockUsers, deleteUsers } = useUserActions();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "lastLogin",
    direction: "desc",
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    status: "all",
  });

  const { data: users, isLoading } = useUsers(sortConfig);

  // Define filteredUsers before using it in getSelectedUsersStatus
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (filterState.status === "all") return users;

    return users.filter((user) => {
      const matchesStatus =
        filterState.status === "all" ||
        (filterState.status === "active" && user.status === "Active") ||
        (filterState.status === "blocked" && user.status === "Blocked");

      return matchesStatus;
    });
  }, [users, filterState.status]);

  // Now we can use filteredUsers in getSelectedUsersStatus
  const getSelectedUsersStatus = useCallback(() => {
    if (!users || selectedUsers.length === 0) {
      return null;
    }

    // Only consider users that are currently visible based on filters
    const filteredSelectedUsers = filteredUsers.filter((user: User) =>
      selectedUsers.includes(user.email)
    );

    if (filteredSelectedUsers.length === 0) {
      return null;
    }

    const blockedCount = filteredSelectedUsers.filter(
      (user) => user.status === "Blocked"
    ).length;

    if (blockedCount === 0) return "all-active";
    if (blockedCount === filteredSelectedUsers.length) return "all-blocked";
    return "mixed";
  }, [users, selectedUsers, filteredUsers]);

  const handleSort = useCallback((field: keyof User) => {
    setSortConfig((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === "desc" ? "asc" : "desc",
    }));
  }, []);

  const SortButton = ({
    field,
    children,
  }: {
    field: keyof User;
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 relative w-full justify-between"
    >
      <span className="flex items-center gap-2">
        {children}
        <div className="flex items-center gap-1">
          <ArrowUpDown
            className={cn(
              "h-4 w-4 transition-transform",
              sortConfig.field === field && "text-primary-brand",
              sortConfig.field === field &&
                sortConfig.direction === "asc" &&
                "rotate-180"
            )}
          />
        </div>
      </span>
      {sortConfig.field === field && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-brand" />
      )}
    </Button>
  );

  // Memoized selection handlers
  const handleSelectAll = useCallback(() => {
    if (!users) return;
    setSelectedUsers((prev: string[]) =>
      prev.length === users.length ? [] : users.map((user: User) => user.email)
    );
  }, [users]);

  const handleSelectUser = useCallback(
    (userEmail: string, checked: boolean) => {
      // console.log("Selecting user:", userEmail, "Checked:", checked);
      setSelectedUsers((prev) => {
        if (checked) {
          return [...prev, userEmail];
        }
        return prev.filter((id) => id !== userEmail);
      });
    },
    []
  );

  const handleBlock = async () => {
    if (!selectedUsers.length) {
      toast.error("Please select users to block");
      return;
    }

    setLoadingState({ type: "block", userIds: selectedUsers });
    try {
      const currentUser: User | undefined = users?.find(
        (u: User) => u.email === session?.user?.email
      );
      const isBlockingSelf =
        currentUser?.email && selectedUsers.includes(currentUser.email);

      await blockUsers.mutateAsync({
        userIds: selectedUsers,
        status: "Blocked",
      });

      if (isBlockingSelf) {
        toast.success("Your account has been blocked. You will be logged out.");
        setLoadingState(null);
        await signOut({
          redirect: true,
          callbackUrl: "/login",
        });
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } catch (error) {
      console.error("Failed to block users:", error);
      toast.error("Failed to block users");
    } finally {
      setLoadingState(null);
    }
  };

  // Similarly update handleUnblock
  const handleUnblock = async () => {
    if (!selectedUsers.length) {
      toast.error("Please select users to unblock");
      return;
    }

    setLoadingState({ type: "unblock", userIds: selectedUsers });
    try {
      await blockUsers.mutateAsync({
        userIds: selectedUsers,
        status: "Active",
      });
      await new Promise((resolve) => setTimeout(resolve, 1200));
    } catch (error) {
      console.error("Failed to unblock users:", error);
      toast.error("Failed to unblock users");
    } finally {
      setLoadingState(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUsers.mutateAsync({
        userIds: selectedUsers,
      });

      // If current user is deleted, redirect to login
      const currentUser: User | undefined = users?.find(
        (u: User) => u.email === session?.user?.email
      );
      if (currentUser?.email && selectedUsers.includes(currentUser.email)) {
        await signOut({ redirect: false });
        router.push("/login");
        return;
      }

      setSelectedUsers([]);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete users:", error);
    }
  };

  // Update the ToolbarButtons component
  const ToolbarButtons = () => {
    const selectionStatus = getSelectedUsersStatus();
    const hasSelection = selectedUsers.length > 0;

    if (!hasSelection || !selectionStatus) {
      return null;
    }

    return (
      <div className="flex items-center">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            {/* Show Block button only if there are active users in the filtered selection */}
            {(selectionStatus === "all-active" ||
              selectionStatus === "mixed") && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <ActionButton
                    variant="destructive"
                    size="sm"
                    onClick={handleBlock}
                    disabled={blockUsers.isPending}
                    className="gap-2"
                    icon={<Shield className="h-4 w-4" />}
                    loading={loadingState?.type === "block"}
                  >
                    Block Selected ({selectedUsers.length})
                  </ActionButton>
                </TooltipTrigger>
                <TooltipContent>Block selected users</TooltipContent>
              </Tooltip>
            )}

            {/* Show Unblock button only if there are blocked users in the filtered selection */}
            {(selectionStatus === "all-blocked" ||
              selectionStatus === "mixed") && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <ActionButton
                    variant="outline"
                    size="sm"
                    onClick={handleUnblock}
                    disabled={blockUsers.isPending}
                    className="gap-2"
                    icon={<ShieldOff className="h-4 w-4" />}
                    loading={loadingState?.type === "unblock"}
                  >
                    Unblock Selected ({selectedUsers.length})
                  </ActionButton>
                </TooltipTrigger>
                <TooltipContent>Unblock selected users</TooltipContent>
              </Tooltip>
            )}

            {/* Delete dialog remains unchanged */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <div className="pr-2">
                  <ActionButton
                    variant="destructive"
                    size="sm"
                    disabled={deleteUsers.isPending}
                    className="gap-2"
                    icon={<UserX className="h-4 w-4" />}
                    loading={deleteUsers.isPending}
                  >
                    Delete Selected ({selectedUsers.length})
                  </ActionButton>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete{" "}
                    {selectedUsers.length} selected{" "}
                    {selectedUsers.length === 1 ? "user" : "users"} and remove
                    their data from the server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    disabled={deleteUsers.isPending}
                  >
                    {deleteUsers.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TooltipProvider>
      </div>
    );
  };

  const SelectAllCheckbox = () => {
    const isAllSelected =
      users?.length > 0 && selectedUsers.length === users?.length;
    // const isPartiallySelected =
    //   selectedUsers.length > 0 && selectedUsers.length < (users?.length || 0);

    return (
      <Checkbox
        checked={isAllSelected}
        // data-state={isPartiallySelected ? "indeterminate" : undefined}
        onCheckedChange={handleSelectAll}
        aria-label="Select all users"
      />
    );
  };

  // Only show loading state on initial load
  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ToolbarButtons />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users..."
              className="pl-9 w-[300px] bg-white"
            />
          </div>
          <UserTableFilter
            filterState={filterState}
            onFilterChange={setFilterState}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary-brand hover:bg-primary-brand/90">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <div className="rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <SelectAllCheckbox />
              </TableHead>
              <TableHead>
                <SortButton field="name">Name</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="email">Email</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="lastLogin">Last Login</SortButton>
              </TableHead>
              <TableHead>
                <SortButton field="status">Status</SortButton>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className={cn(
                  selectedUsers.includes(user.email) && "bg-muted/50"
                )}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.email)}
                    onCheckedChange={(checked: boolean | "indeterminate") =>
                      handleSelectUser(user.email, checked as boolean)
                    }
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <UserAvatar name={user.name} />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <LastSeenIndicator
                    lastSeen={user.lastLogin}
                    status={getUserStatus(user.lastLogin)}
                  />
                </TableCell>
                <TableCell>
                  <StatusCell user={user} loadingState={loadingState} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}
