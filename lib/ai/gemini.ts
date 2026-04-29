import { VertexAI, GenerateContentRequest } from '@google-cloud/vertexai';

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({
  project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
  location: 'asia-south1'
});

export function getGeminiModel(systemInstruction?: string) {
  return vertex_ai.getGenerativeModel({
    model: 'gemini-1.5-pro',
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
