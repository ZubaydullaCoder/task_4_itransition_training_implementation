import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { validateUser } from "@/lib/auth";

export async function DELETE(request: Request) {
  const validation = await validateUser();

  if (validation.error) {
    return NextResponse.json(
      { error: validation.error },
      { status: validation.status }
    );
  }

  try {
    const { userIds } = await request.json();

    if (!userIds) {
      return NextResponse.json(
        { error: "User IDs are required" },
        { status: 400 }
      );
    }

    await connectDB();
    await User.deleteMany({ email: { $in: userIds } });

    return NextResponse.json(
      { message: "Users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete users: ${error}` },
      { status: 500 }
    );
  }
}
