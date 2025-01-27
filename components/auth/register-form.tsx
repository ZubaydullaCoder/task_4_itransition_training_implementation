"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Building } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { showSuccessToast, showErrorToast } from "@/lib/toast-config";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true);
      // setError("");
      // setSuccessMessage("");
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      // Show success message
      showSuccessToast("Account created successfully! Redirecting to login...");
      // setSuccessMessage(
      //   "Account created successfully! Redirecting to login..."
      // );
      // Redirect after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      // setError(error instanceof Error ? error.message : "Something went wrong");
      showErrorToast(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* {error && (
        <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="p-3 rounded-md bg-green-200 text-white text-sm">
          {successMessage}
        </div>
      )} */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <User size={18} />
          </div>
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="John Doe"
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company Name</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Building size={18} />
          </div>
          <Input
            {...register("company")}
            id="company"
            placeholder="Company Ltd."
            type="text"
            autoCapitalize="words"
            autoComplete="organization"
            disabled={isLoading}
            className="pl-10"
          />
        </div>
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail size={18} />
          </div>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="name@example.com"
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Lock size={18} />
          </div>
          <Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            disabled={isLoading}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" className="mt-1" />
        <Label htmlFor="terms" className="text-sm font-normal leading-relaxed">
          I agree to the{" "}
          <Link href="/terms" className="text-primary-brand hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary-brand hover:underline">
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
