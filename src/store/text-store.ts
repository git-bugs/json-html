import { create } from 'zustand';

type State = {
  originalText: string;
  processedText: string;
  activeButtonId: string;
  setOriginal: (text: string) => void;
  removeAttributes: () => void;
  removeTags: () => void;
  commitProcessedToOriginal: () => void;
  removeEmptyLines: () => void;
  format: () => void;
  resetToOriginal: () => void;
  escaping: () => void;
};

export const buttonIds = {
  BUTTON_1: 'attr',
  BUTTON_2: 'tags',
  BUTTON_3: 'lines',
  BUTTON_4: 'format',
  BUTTON_5: 'escaping',
};

export const useTextStore = create<State>((set, get) => ({
  originalText: '',
  processedText: '',
  activeButtonId: '',
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
    set({ activeButtonId: buttonIds.BUTTON_1 });
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
    set({ activeButtonId: buttonIds.BUTTON_2 });
    const raw = get().originalText;
    const noTags = raw.replace(/<[^>]+>/g, '');
    const noEmptyLines = noTags
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ processedText: noEmptyLines });
  },

  removeEmptyLines: () => {
    set({ activeButtonId: buttonIds.BUTTON_3 });
    const raw = get().originalText;
    const cleaned = raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');

    set({ processedText: cleaned });
  },

  format: () => {
    set({ activeButtonId: buttonIds.BUTTON_4 });
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

  escaping: () => {
    set({ activeButtonId: buttonIds.BUTTON_5 });
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
