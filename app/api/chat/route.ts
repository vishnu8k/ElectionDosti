import { NextRequest } from 'next/server';
import { z } from 'zod';
import { generateContentStream } from '@/lib/ai/gemini';
import { getEducationSystemPrompt } from '@/lib/ai/prompts';
import { classifyIntent } from '@/lib/ai/intent-router';

const ChatRequestSchema = z.object({
  message: z.string().min(1).max(500),
  language: z.enum(['en', 'hi', 'ta', 'te', 'kn', 'bn']),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).max(16)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ChatRequestSchema.parse(body);
    
    // First, classify intent
    const intent = await classifyIntent(data.message);
    
    if (intent === 'GENERAL') {
      // If it's general or unrelated, return a simple response
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode("Hello! I am ElectionDosti. I can help you with election education, myth-busting, election timelines, and finding your polling booth. How can I assist you today?"));
            controller.close();
          }
        }),
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    }
    
    // Convert history format to Vertex AI format
    const contents = data.history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));
    
    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: data.message }]
    });

    // We'll use the education prompt for general chat/education intent
    const systemInstruction = getEducationSystemPrompt(data.language);
    
    const streamResult = await generateContentStream({ contents }, systemInstruction);
    
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamResult.stream) {
            const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (error) {
          console.error("Streaming error:", error);
        } finally {
          controller.close();
        }
      }
    });
    
    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      } 
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Response.json({ error: (error as any).errors }, { status: 400 });
    }
    console.error('Chat API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
