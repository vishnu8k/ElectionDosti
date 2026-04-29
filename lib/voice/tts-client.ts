import { db } from '../db/dexie';

export async function speakText(text: string, language: string): Promise<void> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text + language))
    .then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''));

  let audioBlob: Blob;
  
  const cached = await db.ttsAudio.get(hash);
  if (cached) {
    audioBlob = cached.blob;
  } else {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language })
    });
    
    if (!response.ok) throw new Error('TTS synthesis failed');
    
    audioBlob = await response.blob();
    await db.ttsAudio.put({ hash, blob: audioBlob });
  }

  const url = URL.createObjectURL(audioBlob);
  const audio = new Audio(url);
  await audio.play();
  
  audio.onended = () => {
    URL.revokeObjectURL(url);
  };
}
