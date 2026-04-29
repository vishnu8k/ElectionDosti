/* eslint-disable @typescript-eslint/no-explicit-any */
export class SpeechRecognitionService {
  private recognition: any;

  constructor(private onResult: (text: string, isFinal: boolean) => void,
              private onError: (e: Error) => void) {
    const SpeechRecognition = (window as any).SpeechRecognition ||
                              (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error('STT_NOT_SUPPORTED');
    }
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
  }

  start(language: string) {
    this.recognition.lang = language;
    this.recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      this.onResult(result[0].transcript, result.isFinal);
    };
    this.recognition.onerror = (e: any) => {
      this.onError(new Error(e.error));
    };
    this.recognition.onend = () => {
      // Allow clean shutdown or restart if needed.
    };
    this.recognition.start();
  }

  stop() { 
    if (this.recognition) {
      this.recognition.stop(); 
    }
  }
}
