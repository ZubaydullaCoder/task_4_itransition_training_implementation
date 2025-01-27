export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Blocked";
  createdAt: string;
}

export interface SortConfig {
  field: keyof User;
  direction: "asc" | "desc";
}

export interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
  status: "Active" | "Blocked";
  createdAt: string;
}

export interface LoadingState {
  type: "block" | "unblock" | "delete";
  userIds: string[];
}
