import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.LLM_TOKEN);

export async function POST(request: Request) {
  const res = await request.json();

  // `Plan Name: good health, Date of birth: 1995-05-15, Height: 175cm, Weight: 75kg. Generate workout goals, please answer me in format [goal1, goal2] only title, without no., without summary`

  console.log(res.content);

  const out = await hf.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content: res.content,
      },
    ],
    max_tokens: 500,
    temperature: 0.1,
    seed: 0,
  });

  const content = out.choices[0].message.content;

  return NextResponse.json({ content });
}
