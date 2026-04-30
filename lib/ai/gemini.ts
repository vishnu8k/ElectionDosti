import { VertexAI, GenerateContentRequest } from '@google-cloud/vertexai';

let vertex_ai: VertexAI;

export function getGeminiModel(systemInstruction?: string) {
  if (!process.env.GCP_PROJECT_ID) {
    throw new Error('GCP_PROJECT_ID environment variable is not set');
  }

  if (!vertex_ai) {
    vertex_ai = new VertexAI({
      project: process.env.GCP_PROJECT_ID,
      location: 'us-central1'
    });
  }
  return vertex_ai.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction,
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.2,
      topP: 0.8,
      topK: 40
    }
  });
}

export async function generateContentStream(request: GenerateContentRequest, systemInstruction?: string) {
  const model = getGeminiModel(systemInstruction);
  return await model.generateContentStream(request);
}

export async function generateContent(request: GenerateContentRequest, systemInstruction?: string) {
  const model = getGeminiModel(systemInstruction);
  return await model.generateContent(request);
}
