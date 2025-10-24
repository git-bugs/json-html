import { create } from 'zustand';

type State = {
  originalText: string;
  processedText: string;
  activeButtonId: string;
  fileName: string;
  isProcessing: boolean;
  setFileName: (name: string) => void;
  setOriginal: (text: string) => void;
  removeAttributes: () => void;
  removeTags: () => void;
  commitProcessedToOriginal: () => void;
  removeEmptyLines: () => void;
  format: () => void;
  resetToOriginal: () => void;
  escaping: () => void;
  minify: () => void;
};

export const buttonIds = {
  BUTTON_1: 'attr',
  BUTTON_2: 'tags',
  BUTTON_3: 'lines',
  BUTTON_4: 'format',
  BUTTON_5: 'escaping',
  BUTTON_6: 'minify',
};

export const useJsonStore = create<State>((set, get) => ({
  originalText: '',
  processedText: '',
  activeButtonId: '',
  fileName: '',
  isProcessing: false,
  setFileName: (name) => set({ fileName: name }),

  setOriginal: (text) => {
    set({ activeButtonId: '' });
    set({ originalText: text, processedText: text });
  },

  commitProcessedToOriginal: () => {
    const processed = get().processedText;
    set({ originalText: processed });
  },

  resetToOriginal: () => {
    set({ activeButtonId: '' });
    const original = get().originalText;
    set({ processedText: original });
  },

  removeAttributes: () => {
    set({ activeButtonId: buttonIds.BUTTON_1, isProcessing: true });
    const raw = get().originalText;
    const removerd = raw.replace(/<(\w+)(\s[^>]*)?>/g, '<$1>');
    const noEmptyLines = removerd
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ processedText: noEmptyLines, isProcessing: false });
  },

  removeTags: () => {
    set({ activeButtonId: buttonIds.BUTTON_2, isProcessing: true });
    const raw = get().originalText;
    const noTags = raw.replace(/<[^>]+>/g, '');
    const noEmptyLines = noTags
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ processedText: noEmptyLines, isProcessing: false });
  },

  removeEmptyLines: () => {
    set({ activeButtonId: buttonIds.BUTTON_3, isProcessing: true });
    const raw = get().originalText;
    const cleaned = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    set({ processedText: cleaned, isProcessing: false });
  },

  format: () => {
    set({ activeButtonId: buttonIds.BUTTON_4, isProcessing: true });
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

    set({ processedText: formatted.trim(), isProcessing: false });
  },

  escaping: () => {
    set({ activeButtonId: buttonIds.BUTTON_5, isProcessing: true });
    const raw = get().originalText;
    const sanitized = raw
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    set({ processedText: sanitized, isProcessing: false });
  },

  minify: () => {
    set({ activeButtonId: buttonIds.BUTTON_6, isProcessing: true });
    const raw = get().originalText;
    const minified = raw
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    set({ processedText: minified, isProcessing: false });
  },
}));
