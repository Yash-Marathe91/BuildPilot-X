import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, agentRole, agentName } = await req.json();

    // System prompt tailored to the selected agent
    const systemPrompt = `You are ${agentName}, the ${agentRole} of an autonomous AI venture studio platform called BuildPilot X. 
    You are an expert in your domain. Provide strategic, actionable, and highly sophisticated advice to the founder.
    Keep your responses concise but extremely valuable. Format with Markdown. Use an authoritative, confident, yet helpful tone.
    Do not mention you are an AI. You are a virtual executive.`;

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: systemPrompt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      messages: messages as any[],
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("AI Chat Error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500 });
  }
}
