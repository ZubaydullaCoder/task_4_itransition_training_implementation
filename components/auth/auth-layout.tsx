import Image from "next/image";
import { ClientProvider } from "@/providers/client-provider";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2 relative">
      {/* Left side - Form Section */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-sm space-y-8">
          <ClientProvider>{children}</ClientProvider>
        </div>
      </div>

      {/* Right side - Animated Background Image */}
      <div className="hidden md:block relative overflow-hidden">
        {/* Blur intersection effect */}
        <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-r from-white/40 to-transparent backdrop-blur-[10px] z-20" />

        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/20 z-10 backdrop-blur-[1px]" />

        {/* Background image with Ken Burns effect */}
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="https://media-hosting.imagekit.io//d5a0f4f80acb4d76/right_section_bg_image.jpg?Expires=1832535608&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=uGnvAOSl1jHntlaPRQL7cftLGg-GktzGb7PsCm9b4A-4xWhX4OUbGYS8epxt4vJwZshWSRWqMIBJfRAAFccHMkQ1FPq6ZQG8AAUn5i8q2GRk71WVfExALE2DBqb5CNfnQ6ruyCTrj-Y5fVhg7LzLrRpReThMVynt-dpDBB0a0cgPih~x3mi8CqGv2g21fjmWFNTwW40J5V58SjZFX8P238IUE1xIW6UQXJfXakhVlw5krxMPkWbhNzYa2scC5oo2e1~gyim2FcCzFhhAI7t91cH38IhVdbXoH-BixUo4iOaB-uSrt~0S0W6ioFXgb5l93bOH1WHXAMypNUVqnC5XSw__"
            alt="Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-brand/30 to-purple-600/30 z-20 animate-gradient" />
      </div>
    </div>
  );
}
