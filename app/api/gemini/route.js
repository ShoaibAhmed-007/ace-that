// src/app/api/gemini/route.js
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { jobPosition, jobDesc, experience, count } = await req.json();

    if (!jobPosition || !jobDesc) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Prepare the input
    const config = { responseMimeType: "text/plain" };
    const model = "gemini-2.5-flash-preview-04-17";

    // Update the prompt to request pure JSON output
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Create a set of ${count} interview questions along with their answers for a ${jobPosition} with ${experience} years of experience. The main technologies to focus on are: ${jobDesc}. Provide both technical and behavioral questions in pure JSON format with the following structure:


  "questions":[
    {
      "id":1,
      "type":"technical",
      "question":"Question here",
      "answer":"Answer here"
    }
  ]


Please make sure there is NO additional text, explanations, or code fences — just pure JSON.`,
            },
          ],
        },
      ],
    });

    let fullResponse = "";
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }

    // Strip code fences if present
    let cleaned = fullResponse.trim();

    if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
    if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
    if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);

    cleaned = cleaned.trim();

    // Now safely parse
    let parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
