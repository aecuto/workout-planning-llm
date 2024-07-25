import { NextResponse } from "next/server";
import { Ollama } from "ollama";

const ollama = new Ollama();

export async function POST(request: Request) {
  const res = await request.json();

  const response = await ollama.chat({
    model: "llama3",
    messages: [
      {
        role: "system",
        content:
          "you are gym master. you will generate workout goals from users data. you will response in format array of string in one line",
      },
      {
        role: "user",
        content: res.content,
      },
    ],
    options: { temperature: 0 },
  });

  return NextResponse.json({ content: response.message.content });
}
