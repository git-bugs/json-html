import { Lang } from '@/types/lang';
import { create } from 'zustand';

type State = {
  original: string;
  result: string;
  activeButtonId: string;
  fileName: string;
  isProcessing: boolean;
  lang: Lang;
  setLang: (lang: Lang) => void;
  setFileName: (name: string) => void;
  setOriginal: (text: string) => void;
  format: () => void;
  minify: () => void;
  removeKey: (key: string) => void;
  addKey: () => void;
  renameKey: () => void;
  moveKey: () => void;
  commitProcessedToOriginal: () => void;
  resetToOriginal: () => void;
};

export const buttonIds = {
  BUTTON_1: 'format',
  BUTTON_2: 'minify',
  BUTTON_3: 'remove',
  BUTTON_4: 'add',
  BUTTON_5: 'rename',
  BUTTON_6: 'move',
};

export const useJsonStore = create<State>((set, get) => ({
  original: '',
  result: '',
  activeButtonId: '',
  fileName: '',
  lang: 'en',
  isProcessing: false,
  setLang: (lang: Lang) => set({ lang }),

  setFileName: (name) => set({ fileName: name }),

  setOriginal: (text) => {
    set({ activeButtonId: '' });
    set({ original: text, result: text });
  },

  commitProcessedToOriginal: () => {
    const processed = get().result;
    set({ original: processed });
  },

  resetToOriginal: () => {
    set({ activeButtonId: '' });
    const original = get().original;
    set({ result: original });
  },

  format: () => {
    set({ activeButtonId: buttonIds.BUTTON_1, isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      const pretty = JSON.stringify(parsed, null, 2);
      set({ result: pretty, isProcessing: false });
    } catch (e) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
        activeButtonId: '',
      });
    }
  },

  minify: () => {
    set({ activeButtonId: buttonIds.BUTTON_2, isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      let minifyed;
      if (
        Array.isArray(parsed) ||
        (typeof parsed === 'object' && parsed !== null)
      ) {
        minifyed = JSON.stringify(parsed);
        set({ result: minifyed, isProcessing: false });
      } else {
        set({
          result: 'JSON должен быть объектом или массивом',
          isProcessing: false,
        });
      }
    } catch {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
        activeButtonId: '',
      });
    }
  },

  removeKey: (key) => {
    set({ activeButtonId: buttonIds.BUTTON_3, isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      let removed;

      if (Array.isArray(parsed)) {
        removed = parsed.map((obj: any) => {
          if (typeof obj === 'object' && obj !== null) {
            const copy = { ...obj };
            delete copy[key];
            return copy;
          }
          return obj;
        });
      } else if (typeof parsed === 'object' && parsed !== null) {
        const copy = { ...parsed };
        delete copy[key];
        removed = copy;
      }

      set({ result: JSON.stringify(removed), isProcessing: false });
    } catch (error) {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
        activeButtonId: '',
      });
    }
  },

  addKey: () => {
    set({ activeButtonId: buttonIds.BUTTON_4, isProcessing: true });
    const raw = get().original;

    set({ result: '', isProcessing: false });
  },

  renameKey: () => {
    set({ activeButtonId: buttonIds.BUTTON_5, isProcessing: true });
    const raw = get().original;

    set({ result: '', isProcessing: false });
  },

  moveKey: () => {
    set({ activeButtonId: buttonIds.BUTTON_6, isProcessing: true });
    const raw = get().original;

    set({ result: '', isProcessing: false });
  },
}));
