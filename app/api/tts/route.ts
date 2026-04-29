import { TextToSpeechClient } from '@google-cloud/text-to-speech';

// Initialize the client. It will use process.env.GOOGLE_APPLICATION_CREDENTIALS 
// or default credentials from the environment.
const tts = new TextToSpeechClient();

const VoiceMap: Record<string, string> = {
  'en': 'en-IN-Wavenet-A', 'hi': 'hi-IN-Wavenet-A',
  'ta': 'ta-IN-Wavenet-A', 'te': 'te-IN-Standard-A',
  'kn': 'kn-IN-Wavenet-A', 'bn': 'bn-IN-Wavenet-A'
};

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();
    const [response] = await tts.synthesizeSpeech({
      input: { text },
      voice: { languageCode: `${language}-IN`, name: VoiceMap[language] || 'en-IN-Wavenet-A' },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95 }
    });
    return new Response(response.audioContent as unknown as BodyInit, {
      headers: { 'Content-Type': 'audio/mpeg' }
    });
  } catch (error) {
    console.error('TTS Error:', error);
    return new Response(JSON.stringify({ error: 'TTS Synthesis failed' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
