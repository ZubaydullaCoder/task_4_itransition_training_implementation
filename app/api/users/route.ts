import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { validateUser } from "@/lib/auth";

export async function GET() {
  try {
    const validation = await validateUser();

    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error,
          isBlocked: validation.isBlocked,
        },
        { status: validation.status }
      );
    }

    await connectDB();
    const users = await User.find({}).sort({ lastLogin: -1 });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
