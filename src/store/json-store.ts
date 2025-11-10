import { create } from 'zustand';

type State = {
  original: string;
  result: string;
  fileName: string;
  isProcessing: boolean;
  jsonKeys: string[];
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

  setFileName: (name) => set({ fileName: name }),

  setOriginal: (text) => {
    try {
      set({ original: text });
      JSON.parse(text);
      get().extractKeys();
      set({ validJson: true });
    } catch {
      set({ validJson: false });
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
    } catch {}
  },

  format: () => {
    set({ isProcessing: true });
    try {
      const parsed = JSON.parse(get().original);
      const pretty = JSON.stringify(parsed, null, 2);
      set({ result: pretty, isProcessing: false });
    } catch {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
      });
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
          result: 'Invalid JSON',
          isProcessing: false,
        });
      }
    } catch {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
      });
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
    } catch {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
      });
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
    } catch {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
      });
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
    } catch {
      set({
        result: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },
}));
