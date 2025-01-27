import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function validateUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        error: "Session expired. Please login again",
        status: 401,
      };
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return {
        error: "User not found",
        status: 404,
      };
    }

    // Handle blocked user
    if (user.status === "Blocked") {
      return {
        error: "Your account has been blocked",
        status: 403,
        isBlocked: true,
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Validation error:", error);
    return {
      error: "An error occurred during validation",
      status: 500,
    };
  }
}
