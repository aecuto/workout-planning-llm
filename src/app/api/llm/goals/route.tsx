import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const hf = new HfInference(process.env.LLM_TOKEN);

export async function POST(request: Request) {
  const res = await request.json();

  // `Plan Name: good health, Date of birth: 1995-05-15, Height: 175cm, Weight: 75kg. Generate workout goals, please answer me in format [goal1, goal2] only title, without no., without summary`

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

  // const response = await hf.textGeneration({
  //   model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
  //   inputs: `<|prompter|>${res.content}<|endoftext|><|assistant|>`,
  //   parameters: {
  //     max_new_tokens: 200,
  //     // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
  //     typical_p: 0.2,
  //     repetition_penalty: 1,
  //     truncate: 1000,
  //     return_full_text: false,
  //   },
  // });

  // const content = response.generated_text;

  return NextResponse.json({ content });
}
