import { expect, test, describe } from 'vitest';
import { getEducationSystemPrompt, getMythBustSystemPrompt, getIntentClassifierPrompt } from '../../lib/ai/prompts';

describe('Prompts', () => {
  test('getEducationSystemPrompt returns correctly for English', () => {
    const prompt = getEducationSystemPrompt('en');
    expect(prompt).toContain('en');
    expect(prompt).toContain('ElectionDosti');
    expect(prompt).toContain('impartial AI assistant');
  });

  test('getEducationSystemPrompt returns correctly for Hindi', () => {
    const prompt = getEducationSystemPrompt('hi');
    expect(prompt).toContain('hi');
  });

  test('getMythBustSystemPrompt includes JSON instruction', () => {
    const prompt = getMythBustSystemPrompt('ta');
    expect(prompt).toContain('ta');
    expect(prompt).toContain('JSON object');
    expect(prompt).toContain('TRUE');
    expect(prompt).toContain('FALSE');
  });

  test('getIntentClassifierPrompt includes all intents', () => {
    const prompt = getIntentClassifierPrompt();
    expect(prompt).toContain('EDUCATION');
    expect(prompt).toContain('MYTH');
    expect(prompt).toContain('TIMELINE');
    expect(prompt).toContain('BOOTH');
    expect(prompt).toContain('GENERAL');
  });
});
