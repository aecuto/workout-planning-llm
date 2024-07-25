// import { HfInference } from "@huggingface/inference";
import { streamText } from "ai";

// const hf = new HfInference(process.env.LLM_TOKEN);

import { ollama } from "ollama-ai-provider";

export async function POST(request: Request) {
  const res = await request.json();

  console.log(res);

  const result = await streamText({
    model: ollama("llama3"),
    prompt: res.prompt,
  });

  return result.toAIStreamResponse();
}
