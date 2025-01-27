"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    // If user is authenticated, redirect to admin page
    if (session) {
      router.push("/admin/users");
    }
  }, [session, router]);
  if (session) {
    return null;
  }

  return <div className="min-h-screen">{children}</div>;
}
