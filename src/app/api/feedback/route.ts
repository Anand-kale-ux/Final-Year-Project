import { NextResponse }
from "next/server";

import { connectDB }
from "@/lib/mongodb";

import Feedback
from "@/models/Feedback";

export async function POST(
    req: Request
) {

    await connectDB();

    try {

        const body =
            await req.json();

        const feedback =
            await Feedback.create(body);

        return NextResponse.json({
            success: true,
            feedback,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                error:
                    "Server Error",
            },

            {
                status: 500,
            }
        );
    }
}