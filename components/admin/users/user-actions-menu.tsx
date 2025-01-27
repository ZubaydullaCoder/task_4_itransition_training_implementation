"use client";

import { useState } from "react";

interface LoadingState {
  userIds: string[];
}
import { MoreVertical, Shield, ShieldOff, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface UserActionsMenuProps {
  user: {
    email: string;
    status: "Active" | "Blocked";
    name: string;
  };
  onActionComplete?: () => void;
  loadingState?: LoadingState | null;
  onBlock: (userIds: string) => Promise<void>;
  onUnblock: (userIds: string) => Promise<void>;
  onDelete: (userIds: string) => Promise<void>;
}

export function UserActionsMenu({
  user,
  loadingState,
  onActionComplete,
  onBlock,
  onUnblock,
  onDelete,
}: UserActionsMenuProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isLoading = loadingState?.userIds.includes(user.email);

  const handleStatusChange = async (newStatus: "Active" | "Blocked") => {
    try {
      if (newStatus === "Blocked") {
        await onBlock(user.email);
      } else {
        await onUnblock(user.email);
      }
      // Don't call onActionComplete for block/unblock
    } catch (error) {
      console.error(`Failed to ${newStatus.toLowerCase()} user:`, error);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(user.email);
      setIsDeleteDialogOpen(false);
      // Only call onActionComplete for delete
      onActionComplete?.();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" disabled={isLoading}>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user.status === "Active" ? (
            <DropdownMenuItem
              onClick={() => handleStatusChange("Blocked")}
              className="text-destructive"
              disabled={isLoading}
            >
              <Shield className="h-4 w-4 mr-2" />
              Block User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => handleStatusChange("Active")}
              disabled={isLoading}
            >
              <ShieldOff className="h-4 w-4 mr-2" />
              Unblock User
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-destructive"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-medium">{user.name}</span>s account and
              remove their data from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
