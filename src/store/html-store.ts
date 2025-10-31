import { create } from 'zustand';

export type HtmlState = {
  original: string;
  result: string;
  fileName: string;
  isProcessing: boolean;
  setFileName: (name: string) => void;
  setOriginal: (text: string) => void;
  removeAttributes: () => void;
  removeTags: () => void;
  acceptResultToOriginal: () => void;
  removeEmptyLines: () => void;
  format: () => void;
  resetToOriginal: () => void;
  escaping: () => void;
  minify: () => void;
};

export const useHtmlStore = create<HtmlState>((set, get) => ({
  original: '',
  result: '',
  fileName: '',
  isProcessing: false,
  setFileName: (name) => set({ fileName: name }),

  setOriginal: (text) => {
    set({ original: text, result: text });
  },

  acceptResultToOriginal: () => {
    const processed = get().result;
    set({ original: processed });
  },

  resetToOriginal: () => {
    const original = get().original;
    set({ result: original });
  },

  removeAttributes: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const removerd = raw.replace(/<(\w+)(\s[^>]*)?>/g, '<$1>');
    const noEmptyLines = removerd
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ result: noEmptyLines, isProcessing: false });
  },

  removeTags: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const noTags = raw.replace(/<[^>]+>/g, '');
    const noEmptyLines = noTags
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ result: noEmptyLines, isProcessing: false });
  },

  removeEmptyLines: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const cleaned = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    set({ result: cleaned, isProcessing: false });
  },

  format: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const formatted = raw
      .replace(/>\s*/g, '>\n')
      .replace(/\s*</g, '\n<')
      .replace(/;\s*/g, ';\n  ')
      .replace(/{\s*/g, '{\n  ')
      .replace(/\s*}/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n');

    set({ result: formatted.trim(), isProcessing: false });
  },

  escaping: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const sanitized = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    set({ result: sanitized, isProcessing: false });
  },

  minify: () => {
    set({ isProcessing: true });
    const raw = get().original;
    const minified = raw
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    set({ result: minified, isProcessing: false });
  },
}));
