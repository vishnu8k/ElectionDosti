import Dexie, { Table } from 'dexie';

export interface CachedMyth {
  mythId: string;
  claimEn: string; claimHi: string; claimTa: string; claimTe: string;
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE';
  keywords: string[];
  explanationEn: string; explanationHi: string;
  sourceUrl: string;
}

export class ElectionDostiDB extends Dexie {
  myths!: Table<CachedMyth>;
  educationTopics!: Table<Record<string, unknown>>;
  ttsAudio!: Table<{ hash: string; blob: Blob }>;

  constructor() {
    super('ElectionDosti');
    this.version(1).stores({
      myths: 'mythId, *keywords',
      educationTopics: 'topicId',
      ttsAudio: 'hash'
    });
  }
}

export const db = new ElectionDostiDB();
