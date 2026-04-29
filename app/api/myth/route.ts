import { NextRequest } from 'next/server';
import { z } from 'zod';
import { generateContent } from '@/lib/ai/gemini';
import { getMythBustSystemPrompt } from '@/lib/ai/prompts';

const MythRequestSchema = z.object({
  claim: z.string().min(3).max(300),
  language: z.enum(['en', 'hi', 'ta', 'te', 'kn', 'bn'])
});

export async function POST(req: NextRequest) {
  try {
    const data = MythRequestSchema.parse(await req.json());
    
    const systemInstruction = getMythBustSystemPrompt(data.language);
    
    const response = await generateContent(
      { contents: [{ role: 'user', parts: [{ text: data.claim }] }] },
      systemInstruction
    );
    
    let text = response.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Clean up potential markdown formatting if the model didn't follow instructions perfectly
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const result = JSON.parse(text);
      return Response.json(result);
    } catch {
      console.error('Failed to parse myth JSON:', text);
      return Response.json({ 
        verdict: 'PARTIALLY_TRUE', 
        explanation: 'Sorry, I could not verify this claim clearly.',
        confidence: 0
      }, { status: 200 });
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return Response.json({ error: (error as any).errors }, { status: 400 });
    }
    console.error('Myth API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
