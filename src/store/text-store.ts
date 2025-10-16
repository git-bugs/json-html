import { create } from 'zustand';

type State = {
  originalText: string;
  processedText: string;
  setOriginal: (text: string) => void;
  applyFilter: (fn: (text: string) => string) => void;
  reset: () => void;
  removeAttributes: () => void;
  removeTags: () => void;
  commitProcessedToOriginal: () => void;
  removeEmptyLines: () => void;
  format: () => void;
  resetToOriginal: () => void;
  sanitizeHtml: () => void;
};

export const useTextStore = create<State>((set, get) => ({
  originalText: '',
  processedText: '',
  setOriginal: (text) => set({ originalText: text, processedText: text }),
  applyFilter: (fn) => {
    const base = get().originalText;
    set({ processedText: fn(base) });
  },
  reset: () => set((s) => ({ processedText: s.originalText })),
  removeAttributes: () => {
    const raw = get().originalText;
    const removerd = raw.replace(/<(\w+)(\s[^>]*)?>/g, '<$1>');
    const noEmptyLines = removerd
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ processedText: noEmptyLines });
  },

  removeTags: () => {
    const raw = get().originalText;
    const noTags = raw.replace(/<[^>]+>/g, '');
    const noEmptyLines = noTags
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ processedText: noEmptyLines });
  },
  commitProcessedToOriginal: () => {
    const processed = get().processedText;
    set({ originalText: processed });
  },
  removeEmptyLines: () => {
    const raw = get().originalText;

    const cleaned = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    set({ processedText: cleaned });
  },
  format: () => {
    const raw = get().originalText;

    const formatted = raw
      // HTML: перенос после открывающего тега
      .replace(/>\s*/g, '>\n')
      // HTML: перенос перед открывающим тегом
      .replace(/\s*</g, '\n<')
      // CSS: перенос после каждой декларации
      .replace(/;\s*/g, ';\n  ')
      // CSS: перенос после {
      .replace(/{\s*/g, '{\n  ')
      // CSS: перенос перед } и после } на новую строку
      .replace(/\s*}/g, '\n}\n')
      // Удаление двойных пустых строк
      .replace(/\n\s*\n/g, '\n');

    set({ processedText: formatted.trim() });
  },
  resetToOriginal: () => {
    const original = get().originalText;
    set({ processedText: original });
  },
  sanitizeHtml: () => {
    const raw = get().originalText;

    const sanitized = raw
      .replace(/&/g, '&amp;') // сначала экранируем &
      .replace(/</g, '&lt;') // затем <
      .replace(/>/g, '&gt;') // затем >
      .replace(/"/g, '&quot;') // затем "
      .replace(/'/g, '&#39;'); // затем '

    set({ processedText: sanitized });
  },
}));
