import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";

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

export function useUsers(sortConfig?: SortConfig) {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/users", {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 403 && data.isBlocked) {
            toast.error("Your account has been blocked");
            await signOut({
              redirect: true,
              callbackUrl: "/login",
            });
          }
          throw new Error(data.error || "Failed to fetch users");
        }

        return data.users;
      } catch (error) {
        // toast.error("Failed to load users");
        throw error;
      }
    },
    select: (data) => {
      if (!sortConfig) return data;
      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];
        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        return aValue < bValue ? 1 : -1;
      });
    },
    gcTime: 300000, // Replace cacheTime
    staleTime: 5000,
    retry: false,
    placeholderData: (previousData) => previousData, // Replace keepPreviousData
  });
}
