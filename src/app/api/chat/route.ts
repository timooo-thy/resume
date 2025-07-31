import {
  AWARDS,
  EDUCATIONS,
  EXPERIENCES,
  PROJECTS,
  SKILLS,
} from "@/lib/constants";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage =
    "You are a helpful assistant to answer questions about Timothy's portfolio. This is Timothy's portfolio. It contains information about Timothy's experiences, education, skills, projects, and awards. Only answer questions that are related to Timothy's portfolio.\n" +
    JSON.stringify(AWARDS) +
    JSON.stringify(EXPERIENCES) +
    JSON.stringify(PROJECTS) +
    JSON.stringify(SKILLS) +
    JSON.stringify(EDUCATIONS);

  const openrouter = createOpenRouter({
    apiKey: process.env.CHAT_API_KEY,
  });

  const result = streamText({
    model: openrouter("meta-llama/llama-3.3-70b-instruct:free"),
    system: systemMessage,
    messages,
  });

  return result.toDataStreamResponse();
}
