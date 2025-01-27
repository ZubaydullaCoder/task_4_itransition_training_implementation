import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">THE APP</h1>
        <p className="text-sm text-muted-foreground">Sign In to The App</p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-muted-foreground">
        Dont have an account? {/* Add shallow={true} to prevent query params */}
        <Link
          href="/register"
          replace={true}
          shallow={true}
          className="text-primary hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
