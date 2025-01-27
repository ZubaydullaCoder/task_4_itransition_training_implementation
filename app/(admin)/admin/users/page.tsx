import { Metadata } from "next";
import { UsersPageContent } from "@/components/admin/users/users-page-content";

export const metadata: Metadata = {
  title: "Admin - User Management",
  description: "Manage system users",
};

export default function AdminUsersPage() {
  return <UsersPageContent />;
}
