import { generateContent } from './gemini';
import { getIntentClassifierPrompt } from './prompts';

export type Intent = 'EDUCATION' | 'MYTH' | 'TIMELINE' | 'BOOTH' | 'GENERAL';

// Keyword-based fallback classifier so the app works even when Gemini is misconfigured
function localClassify(message: string): Intent {
  const lower = message.toLowerCase();

  const boothKeywords = ['booth', 'polling station', 'where to vote', 'polling booth', 'matdan kendra', 'where can i vote'];
  const mythKeywords = ['myth', 'rumor', 'rumour', 'fake', 'true or false', 'whatsapp', 'claim', 'evm fail', 'rigged', 'fact check', 'is it true', 'real or fake'];
  const timelineKeywords = ['when', 'date', 'schedule', 'phase', 'election date', 'voting date', 'state election', 'timeline'];
  const educationKeywords = ['how to vote', 'register', 'voter id', 'form 6', 'evm', 'vvpat', 'process', 'rights', 'nota', 'candidate', 'eci', 'election commission', 'constituency', 'apply', 'eligible', 'what is', 'explain', 'tell me about'];

  if (boothKeywords.some(kw => lower.includes(kw))) return 'BOOTH';
  if (mythKeywords.some(kw => lower.includes(kw))) return 'MYTH';
  if (timelineKeywords.some(kw => lower.includes(kw))) return 'TIMELINE';
  if (educationKeywords.some(kw => lower.includes(kw))) return 'EDUCATION';

  // If it's a question about elections in general, route to EDUCATION
  if (lower.includes('election') || lower.includes('vote') || lower.includes('voter') || lower.includes('ballot')) {
    return 'EDUCATION';
  }

  return 'GENERAL';
}

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

    return localClassify(message);
  } catch (error) {
    console.error('Intent classification error, using local fallback:', error);
    return localClassify(message);
  }
}
