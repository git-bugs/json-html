import { Lang } from '@/types/lang';
import { create } from 'zustand';

type State = {
  original: string;
  result: string;
  fileName: string;
  isProcessing: boolean;
  lang: Lang;
  jsonKeys: string[];
  setLang: (lang: Lang) => void;
  setFileName: (name: string) => void;
  setOriginal: (text: string) => void;
  acceptResult: () => void;
  resetToOriginal: () => void;
  format: () => void;
  minify: () => void;
  removeKey: (key: string) => void;
  addKey: (
    newKey: string,
    newKeyValue: string,
    newKeyStringValue: string
  ) => void;
  renameKey: (key: string, newKey: string) => void;
  extractKeys: () => void;
  setRusultEmpty: () => void;
  validJson: boolean;
};

export const useJsonStore = create<State>((set, get) => ({
  original: '',
  result: '',
  fileName: '',
  lang: 'en',
  isProcessing: false,
  jsonKeys: [],
  validJson: true,
  setLang: (lang: Lang) => set({ lang }),

  setFileName: (name) => set({ fileName: name }),

  setOriginal: (text) => {
    try {
      set({ original: text });
      get().extractKeys();
      JSON.parse(get().original);
      set({ validJson: true });
    } catch (error) {
      set({ validJson: false });
      console.error(error);
    }
  },

  setRusultEmpty: () => {
    set({ result: '' });
  },

  acceptResult: () => {
    const processed = get().result;
    set({ original: processed });
    get().extractKeys();
  },

  resetToOriginal: () => {
    const original = get().original;
    set({ result: original });
  },

  extractKeys: () => {
    try {
      const parsed = JSON.parse(get().original);
      const keys = new Set<string>();
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach((key) => keys.add(key));
          }
        });
        set({ jsonKeys: Array.from(keys) });
      } else if (typeof parsed === 'object' && parsed !== null) {
        Object.keys(parsed).forEach((key) => keys.add(key));
        set({ jsonKeys: Array.from(keys) });
      } else {
        set({ jsonKeys: [] });
      }
    } catch (error) {
      console.error(error);
    }
  },

  format: () => {
    set({ isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      const pretty = JSON.stringify(parsed, null, 2);
      set({ result: pretty, isProcessing: false });
    } catch (error) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
      });
      console.error(error);
    }
  },

  minify: () => {
    set({ isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      if (
        Array.isArray(parsed) ||
        (typeof parsed === 'object' && parsed !== null)
      ) {
        set({ result: JSON.stringify(parsed), isProcessing: false });
      } else {
        set({
          result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
          isProcessing: false,
        });
      }
    } catch (error) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
      });
      console.error(error);
    }
  },

  removeKey: (key) => {
    set({ isProcessing: true });
    try {
      const parsed = JSON.parse(get().original) as unknown;
      let removed: unknown;

      if (Array.isArray(parsed)) {
        removed = parsed.map((obj: unknown) => {
          if (typeof obj === 'object' && obj !== null) {
            const copy = { ...obj } as Record<string, unknown>;
            delete copy[key];
            return copy;
          }
          return obj;
        });
      } else if (typeof parsed === 'object' && parsed !== null) {
        const copy = { ...parsed } as Record<string, unknown>;
        delete copy[key];
        removed = copy;
      }

      set({ result: JSON.stringify(removed), isProcessing: false });
    } catch (error) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
      });
      console.error(error);
    }
  },

  addKey: (newKey, newKeyValue, newKeyStringValue) => {
    try {
      set({ isProcessing: true });
      const parsed = JSON.parse(get().original) as unknown;
      let value: unknown;
      if (newKeyValue === 'null') value = null;
      if (newKeyValue === 'true' || newKeyValue === 'false')
        value = newKeyValue.trim().toLowerCase() === 'true';
      if (newKeyValue === 'string') value = newKeyStringValue;
      let updated;
      if (Array.isArray(parsed)) {
        updated = parsed.map((obj: unknown) => {
          if (typeof obj === 'object' && obj !== null) {
            return { ...obj, [newKey]: value };
          }
          return obj;
        });
      } else if (typeof parsed === 'object' && parsed !== null) {
        updated = { ...parsed, [newKey]: value };
      }

      set({ result: JSON.stringify(updated), isProcessing: false });
    } catch (error) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
      });
      console.error(error);
    }
  },

  renameKey: (key, newKey) => {
    try {
      set({ isProcessing: true });
      const parsed = JSON.parse(get().original);
      let updated;
      if (Array.isArray(parsed)) {
        updated = parsed.map(({ [key]: value, ...rest }) => ({
          [newKey]: value,
          ...rest,
        }));
      } else if (typeof parsed === 'object' && parsed !== null) {
        const { [key]: value, ...rest } = parsed;
        updated = { [newKey]: value, ...rest };
      }
      set({ result: JSON.stringify(updated), isProcessing: false });
    } catch (error) {
      set({
        result: get().lang === 'en' ? 'Invalid JSON' : 'Невалидный JSON',
        isProcessing: false,
      });
      console.error(error);
    }
  },
}));
