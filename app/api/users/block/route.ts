import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { validateUser } from "@/lib/auth";

export async function PUT(request: Request) {
  const validation = await validateUser();

  if (validation.error) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status }
    );
  }

  try {
    const { userIds, status } = await request.json();

    if (!userIds || !status) {
      return NextResponse.json(
        { error: "User IDs and status are required" },
        { status: 400 }
      );
    }

    await connectDB();
    await User.updateMany({ email: { $in: userIds } }, { $set: { status } });

    return NextResponse.json(
      { message: "Users updated successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating users:", error);
    return NextResponse.json(
      { error: "Failed to update users" },
      { status: 500 }
    );
  }
}
