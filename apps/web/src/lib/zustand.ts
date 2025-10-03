import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
}

export const useDataTableTrigger = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));