import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { currentArchitecture, userMessage } = await req.json();

        if (!currentArchitecture || !userMessage) {
            return NextResponse.json({ error: "Missing required data" }, { status: 400 });
        }

        const prompt = `
        You are a Senior Software Architect. 
        A user has current system architecture design and wants to modify or refine it.
        
        CURRENT ARCHITECTURE:
        ${JSON.stringify(currentArchitecture, null, 2)}
        
        USER REQUEST:
        "${userMessage}"
        
        INSTRUCTIONS:
        1. Analyze the request and how it impacts the existing architecture.
        2. Provide an updated architecture that incorporates the user's request.
        3. Maintain the same JSON structure as the input.
        4. Be realistic and follow industry best practices for the tech stack involved.
        5. Return ONLY the updated JSON architecture. Do not include any other text or markdown decorators.
        
        OUTPUT FORMAT:
        {
            "title": "Project Title",
            "description": "Comprehensive project description",
            "techStack": { "frontend": [], "backend": [], "database": [] },
            "architecture": ["System component 1", "System component 2"],
            "flow": ["Data flows from X to Y"],
            "database": ["Entity A", "Entity B"],
            "features": ["Feature 1", "Feature 2"]
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up text in case of markdown blocks
        const cleanedJson = text.replace(/```json|```/gi, "").trim();
        const updatedArchitecture = JSON.parse(cleanedJson);

        return NextResponse.json({ updatedArchitecture });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
