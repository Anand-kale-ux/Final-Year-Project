import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/ProjectPrompt";

export async function POST(req: Request) {

    await connectDB();

    try {

        const body = await req.json();

        const userMessage =
            body.userMessage;
        const userId = body.userId;

        // API Request
        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify({
                    model:
                        "llama-3.1-8b-instant",

                    messages: [
                        {
                            role: "system",

                            content:
                                "You are a professional AI assistant for software and AI projects.",
                        },

                        {
                            role: "user",

                            content:
                                userMessage,
                        },
                    ],
                }),
            }
        );

        const data =
            await response.json();

        console.log(
            "GROQ RESPONSE:",
            data
        );

        // Extract AI Reply
        const reply =
            data?.choices?.[0]?.message
                ?.content ||
            "No AI response received.";

        // Save Chat To MongoDB
        await Chat.create({
        userId,
        userMessage,
        aiReply: reply,
        });

        return NextResponse.json({
            success: true,
            reply,
        });

    } catch (error) {

        console.error(
            "GROQ ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Server Error",
            },
            {
                status: 500,
            }
        );
    }
}