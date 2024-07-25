import { streamText } from "ai";

import { ollama } from "ollama-ai-provider";

export async function POST(request: Request) {
  const res = await request.json();

  const result = await streamText({
    model: ollama("llama3"),
    prompt: res.prompt,
  });

  return result.toAIStreamResponse();
}
