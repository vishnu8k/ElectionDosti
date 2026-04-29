import { expect, test, describe, vi } from 'vitest';
import { classifyIntent } from '../../lib/ai/intent-router';
import * as gemini from '../../lib/ai/gemini';

// Mock the Gemini API call
vi.mock('../../lib/ai/gemini', () => ({
  generateContent: vi.fn()
}));

describe('Intent Router', () => {
  test('Returns EDUCATION when model outputs EDUCATION', async () => {
    vi.mocked(gemini.generateContent).mockResolvedValueOnce({
      response: {
        candidates: [{ content: { parts: [{ text: 'EDUCATION' }] } }]
      }
    } as any);

    const intent = await classifyIntent('How do I vote?');
    expect(intent).toBe('EDUCATION');
  });

  test('Returns MYTH when model outputs MYTH', async () => {
    vi.mocked(gemini.generateContent).mockResolvedValueOnce({
      response: {
        candidates: [{ content: { parts: [{ text: 'MYTH' }] } }]
      }
    } as any);

    const intent = await classifyIntent('EVMs can be hacked');
    expect(intent).toBe('MYTH');
  });

  test('Defaults to GENERAL when model output is weird', async () => {
    vi.mocked(gemini.generateContent).mockResolvedValueOnce({
      response: {
        candidates: [{ content: { parts: [{ text: 'INVALID_CATEGORY' }] } }]
      }
    } as any);

    const intent = await classifyIntent('Tell me a joke');
    expect(intent).toBe('GENERAL');
  });

  test('Defaults to GENERAL when Gemini fails', async () => {
    vi.mocked(gemini.generateContent).mockRejectedValueOnce(new Error('API failed'));

    const intent = await classifyIntent('How to vote?');
    expect(intent).toBe('GENERAL');
  });
});
