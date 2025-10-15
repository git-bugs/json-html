import { create } from 'zustand';

type State = {
  originalText: string;
  processedText: string;
  setOriginal: (text: string) => void;
  applyFilter: (fn: (text: string) => string) => void;
  reset: () => void;
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
}));
