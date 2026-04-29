import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioBlob = formData.get('audio') as Blob;
    const language = formData.get('language') as string || 'en-IN';
    
    if (!audioBlob) {
      return Response.json({ error: 'No audio provided' }, { status: 400 });
    }

    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString('base64');
    
    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY; 
    
    const response = await fetch(`https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: language,
        },
        audio: {
          content: base64Audio
        }
      })
    });
    
    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    
    const transcript = result.results?.[0]?.alternatives?.[0]?.transcript || '';
    
    return Response.json({ transcript });
  } catch (error) {
    console.error('STT API Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
