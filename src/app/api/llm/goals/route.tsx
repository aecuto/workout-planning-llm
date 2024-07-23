import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.LLM_TOKEN);

export async function POST(request: Request) {
  const res = await request.json();

  // for await (const output of hf.textGenerationStream({
  //   model: "gpt2",
  //   inputs: `i want workout goals`,
  // })) {
  //   console.log(output);
  // }

  // content:
  // "Plan Name good health, Date of birth 1995-05-15,Height 175cm, Weight 75kg. suggestion workout goals in json one line",

  // let out = "";
  // for await (const chunk of hf.chatCompletionStream({
  //   model: "mistralai/Mistral-7B-Instruct-v0.2",
  //   messages: [
  //     {
  //       role: "user",
  //       content:
  //         "Plan Name: good health, Date of birth: 1995-05-15,Height: 175cm, Weight: 75kg. the workout goals Please respond in text with comma",
  //     },
  //   ],
  //   max_tokens: 500,
  //   temperature: 0.1,
  //   seed: 0,
  // })) {
  //   if (chunk.choices && chunk.choices.length > 0) {
  //     out += chunk.choices[0].delta.content;
  //   }
  // }

  // console.log(out);

  return hf.chatCompletion({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "user",
        content:
          "Plan Name: good health, Date of birth: 1995-05-15,Height: 175cm, Weight: 75kg. the workout goals Please respond in text with comma",
      },
    ],
    max_tokens: 500,
    temperature: 0.1,
    seed: 0,
  });

  // return new StreamingTextResponse(stream);
}
