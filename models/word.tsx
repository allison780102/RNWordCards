export interface Word {
  id: number;
  word: string;
  phonetic: string;
  audio_url: string;
  explanations: Explanation[];
  word_roots: WordRoot[];
}

interface Explanation {
  translations: string[];
  word_types: string[];
  sentences: string[];
  notes?: string[];
}

export interface WordRoot {
  id: number;
  part: string | null;
  note: string;
}
