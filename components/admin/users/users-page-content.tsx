"use client";

import { UserTable } from "@/components/admin/users/user-table";
import { UserTableSkeleton } from "@/components/admin/users/user-table-skeleton";
import { AdminLayout } from "@/components/layout/admin-layout";
import { useUsers } from "@/hooks/useUsers";

export function UsersPageContent() {
  const { isLoading, error } = useUsers();

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        </div>
        {isLoading ? (
          <UserTableSkeleton />
        ) : error ? (
          <div className="rounded-md bg-destructive/15 p-4 text-destructive">
            {error.message}
          </div>
        ) : (
          <UserTable />
        )}
      </div>
    </AdminLayout>
  );
}
