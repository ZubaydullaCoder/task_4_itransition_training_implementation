import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuthPage =
      req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register";
    const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

    // Allow unauthenticated access to auth pages
    if (isAuthPage) {
      if (token) {
        // If user is authenticated, redirect to admin
        return NextResponse.redirect(new URL("/admin/users", req.url));
      }
      // Allow access to login/register for unauthenticated users
      return NextResponse.next();
    }

    // Protect admin routes
    if (isAdminPage && !token) {
      // Remove callbackUrl by creating direct login URL
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow access to login/register without auth
        if (
          req.nextUrl.pathname === "/login" ||
          req.nextUrl.pathname === "/register"
        ) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/login", "/register", "/admin/:path*"],
};
