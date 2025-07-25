// export async function POST(req) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");

//     if (!file) {
//       return new Response(JSON.stringify({ error: "No file provided" }), {
//         status: 400,
//       });
//     }

//     const buffer = Buffer.from(await file.arrayBuffer());

//     const deepgramRes = await fetch("https://api.deepgram.com/v1/listen", {
//       method: "POST",
//       headers: {
//         Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
//         "Content-Type": file.type,
//       },
//       body: buffer,
//     });

//     const text = await deepgramRes.text();

//     try {
//       const json = JSON.parse(text);
//       return new Response(
//         JSON.stringify({
//           transcript:
//             json?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "",
//         }),
//         { status: 200 }
//       );
//     } catch (err) {
//       // Not JSON
//       return new Response(
//         JSON.stringify({ error: "Invalid JSON from Deepgram", response: text }),
//         {
//           status: 500,
//         }
//       );
//     }
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//     });
//   }
// }
// app/api/deepgram/route.js
import { createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const language = form.get("language") || "en";

    if (!file || typeof file.arrayBuffer !== "function") {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ This is the CORRECT call
    const response = await deepgram.listen.prerecorded.transcribeFile(buffer, {
      mimetype: file.type,
      model: "general",
      language, // e.g. "zh", "hi", etc.
      smart_format: true,
    });

    const transcript =
      response?.result?.results?.channels[0].alternatives[0].transcript || "";

    return NextResponse.json({ transcript });
  } catch (err) {
    console.error("Deepgram Error:", err);
    return NextResponse.json(
      { error: err.message || "Transcription failed" },
      { status: 500 }
    );
  }
}
