import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    // Parse the request body safely
    let parsedBody;

    try {
      parsedBody = await req.json();
    } catch (err) {
      console.error("JSON parsing error!", err);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const { question, userAnswer, selectedLanguage } = parsedBody;

    console.log("Question from request.", question);
    console.log("User Answer from request.", userAnswer);

    if (!question || !userAnswer) {
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

    const feedbackPrompt = `Question: ${question}.
User Answer: ${userAnswer}.
Please provide a rating for the answer and helpful feedback (3-5 lines) in JSON format with fields "rating" and "feedback".
Respond in the same language the user answered in: ${selectedLanguage}.`;

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents: [{ role: "user", parts: [{ text: feedbackPrompt }] }],
    });

    let fullResponse = "";
    for await (const chunk of response) {
      fullResponse += chunk.text;
    }

    return NextResponse.json(
      { feedback: fullResponse.trim() },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
