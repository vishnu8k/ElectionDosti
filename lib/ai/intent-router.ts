import { generateContent } from './gemini';
import { getIntentClassifierPrompt } from './prompts';

export type Intent = 'EDUCATION' | 'MYTH' | 'TIMELINE' | 'BOOTH' | 'GENERAL';

export async function classifyIntent(message: string): Promise<Intent> {
  try {
    const response = await generateContent(
      { contents: [{ role: 'user', parts: [{ text: message }] }] },
      getIntentClassifierPrompt()
    );
    
    const text = response.response.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toUpperCase();
    
    if (text && ['EDUCATION', 'MYTH', 'TIMELINE', 'BOOTH', 'GENERAL'].includes(text)) {
      return text as Intent;
    }
    
    return 'GENERAL';
  } catch (error) {
    console.error('Intent classification error:', error);
    return 'GENERAL';
  }
}
