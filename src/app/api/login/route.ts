import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {

  await connectDB();

  try {

    const body = await req.json();

    const { email, password } = body;

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    // Compare password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {

      return NextResponse.json(
        {
          success: false,
          error: "Invalid password",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server Error",
      },
      { status: 500 }
    );
  }
}