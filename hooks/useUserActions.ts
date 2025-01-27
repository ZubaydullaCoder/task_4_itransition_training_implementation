import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { showSuccessToast, showErrorToast } from "@/lib/toast-config";
interface UserActionParams {
  userIds: string[];
  status?: "Active" | "Blocked";
}

export function useUserActions() {
  const queryClient = useQueryClient();

  // Shared invalidation logic
  const invalidateUsersData = () => {
    // Invalidate and refetch users data
    queryClient.invalidateQueries({
      queryKey: ["users"],
      exact: true,
      refetchType: "active",
    });
  };

  const blockUsers = useMutation({
    mutationFn: async ({ userIds, status }: UserActionParams) => {
      const response = await fetch("/api/users/block", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userIds, status }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update users");
      return data;
    },
    onSuccess: (_, variables) => {
      invalidateUsersData();
      showSuccessToast(
        `User's status is ${variables.status?.toLowerCase()} now`
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update users");
    },
  });

  const deleteUsers = useMutation({
    mutationFn: async ({ userIds }: { userIds: string[] }) => {
      const response = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userIds }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete users");
      return data;
    },
    onSuccess: () => {
      invalidateUsersData();
      showSuccessToast("User deleted successfully");
    },
    onError: (error: Error) => {
      showErrorToast(error.message || "Failed to delete users");
    },
  });

  return { blockUsers, deleteUsers };
}
