// src/app/api/gemini/route.js
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Validate required environment variables
if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

export async function POST(req) {
  try {
    const { jobPosition, jobDesc, experience, count } = await req.json();

    if (!jobPosition || !jobDesc || !experience || !count) {
      return NextResponse.json(
        { error: "Missing one or more required parameters" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const config = { responseMimeType: "text/plain" };
    const model = "gemini-2.5-flash-preview-04-17";

    const prompt = `Create a set of ${count} interview questions along with their answers for a ${jobPosition} with ${experience} years of experience. The main technologies to focus on are: ${jobDesc}. Provide both technical and behavioral questions in pure JSON format with the following structure:

"questions":[
  {
    "id":1,
    "type":"technical",
    "question":"Question here",
    "answer":"Answer here"
  }
]

Please make sure there is NO additional text, explanations, or code fences — just pure JSON.`;

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let fullResponse = "";
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }

    let cleaned = fullResponse.trim();
    if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
    if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
    if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
    cleaned = cleaned.trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
