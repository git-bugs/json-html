import { create } from 'zustand';

export type FileState = {
  type: string | null;
  fileName: string | null;
  error: string | null;
  data: string | null;
  result: string | null;
  isLoading: boolean;
  isProcessing: boolean;
  option: string | null;
  jsonKeys: string[];
  checkFile: (file: File) => void;
  readJson: (file: File) => void;
  setError: (error: string | null) => void;
  setData: (data: string) => void;
  readHtml: (file: File) => void;
  formatJson: () => void;
  setOption: (option: string) => void;
  extractKeys: () => void;
  minifyJson: () => void;
  removeJsonKey: (key: string) => void;
  addJsonKey: (
    newKey: string,
    newKeyValue: string,
    newKeyStringValue: string
  ) => void;
  renameJsonKey: (key: string, newKey: string) => void;
  formatHtml: () => void;
  minifyHtml: () => void;
  removeHtmlTags: () => void;
  escapingHtml: () => void;
  removeHtmlAttributes: () => void;
  resultToData: () => void;
};

export const useFileStore = create<FileState>((set, get) => ({
  type: null,
  fileName: null,
  error: null,
  data: null,
  result: null,
  isLoading: false,
  isProcessing: false,
  option: null,
  jsonKeys: [],

  setError: (error) => set({ error }),
  setData: (data) => set({ data }),
  setOption: (option) => set({ option }),

  resultToData: () => {
    const processed = get().result;
    set({ data: processed });
    get().extractKeys();
  },

  checkFile: (file) => {
    const name = file.name.toLowerCase();
    const mime = file.type.toLowerCase();

    if (mime === 'application/json' || name.endsWith('.json')) {
      set({ type: 'json', error: null, fileName: file.name });
      get().readJson(file);
    } else if (mime === 'text/html' || name.endsWith('.html')) {
      set({ type: 'html', error: null, fileName: file.name });
      get().readHtml(file);
    } else {
      set({ error: 'Unsupported file type' });
    }
  },

  readJson: (file) => {
    const reader = new FileReader();
    set({ data: null, error: null, isLoading: true });
    reader.onerror = () => {
      set({ error: 'Error reading file', data: null, isLoading: false });
    };

    reader.onload = () => {
      try {
        if (typeof reader.result !== 'string') {
          throw new Error('The file is not text');
        }
        const parsed = JSON.parse(reader.result);
        set({
          data: JSON.stringify(parsed),
          error: null,
          isLoading: false,
          result: JSON.stringify(parsed),
          option: 'formatJson',
        });
        get().extractKeys();
      } catch {
        set({
          error: 'Incorrect JSON format',
          data: null,
          isLoading: false,
        });
      }
    };
    reader.readAsText(file);
  },

  extractKeys: () => {
    try {
      const data = get().data;
      if (typeof data !== 'string') return;
      const parsed = JSON.parse(data);
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

  readHtml: (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const html = reader.result as string;
      const cleaned = html.replace(/^\s*$/gm, '');
      set({ data: cleaned, result: cleaned, option: 'formatHtml' });
    };
    reader.readAsText(file);
  },

  formatJson: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    try {
      const parsed = JSON.parse(data);
      const pretty = JSON.stringify(parsed, null, 2);
      set({ result: pretty, isProcessing: false });
    } catch {
      set({
        error: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },

  minifyJson: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    try {
      const parsed = JSON.parse(data);
      if (
        Array.isArray(parsed) ||
        (typeof parsed === 'object' && parsed !== null)
      ) {
        set({ result: JSON.stringify(parsed), isProcessing: false });
      } else {
        set({
          error: 'Invalid JSON',
          isProcessing: false,
        });
      }
    } catch {
      set({
        error: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },

  removeJsonKey: (key) => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    try {
      const parsed = JSON.parse(data) as unknown;
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
        error: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },

  addJsonKey: (newKey, newKeyValue, newKeyStringValue) => {
    try {
      set({ isProcessing: true });
      const data = get().data;
      if (!data || typeof data !== 'string') return;
      const parsed = JSON.parse(data) as unknown;
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
        error: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },

  renameJsonKey: (key, newKey) => {
    try {
      set({ isProcessing: true });
      const data = get().data;
      if (!data || typeof data !== 'string') return;
      const parsed = JSON.parse(data);
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
        error: 'Invalid JSON',
        isProcessing: false,
      });
    }
  },

  removeHtmlTags: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    const noTags = data.replace(/<[^>]+>/g, '');
    const noEmptyLines = noTags
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ result: noEmptyLines, isProcessing: false });
  },

  formatHtml: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    const formatted = data
      .replace(/>\s*/g, '>\n')
      .replace(/\s*</g, '\n<')
      .replace(/;\s*/g, ';\n  ')
      .replace(/{\s*/g, '{\n  ')
      .replace(/\s*}/g, '\n}\n')
      .replace(/\n\s*\n/g, '\n');

    set({ result: formatted.trim(), isProcessing: false });
  },

  escapingHtml: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    const sanitized = data
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    set({ result: sanitized, isProcessing: false });
  },

  minifyHtml: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    const minified = data
      .replace(/\n/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();

    set({ result: minified, isProcessing: false });
  },

  removeHtmlAttributes: () => {
    set({ isProcessing: true });
    const data = get().data;
    if (!data || typeof data !== 'string') return;
    const removerd = data.replace(/<(\w+)(\s[^>]*)?>/g, '<$1>');
    const noEmptyLines = removerd
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .join('\n');
    set({ result: noEmptyLines, isProcessing: false });
  },
}));
