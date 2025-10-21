import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface CounterState {
  count: number;
  increment: () => void;
}

export const useDataTableTrigger = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

interface UserState {
  isLoggedIn: boolean;
  set: (val: boolean) => void;
}

export const useUpdateUserState = create<UserState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      set: (val: boolean) => set(() => ({ isLoggedIn: val })),
    }),
    {
      name: "user-state"
    }
  )
);

interface CurrentSite {
  id: number | string;
  title: string;
  url: string;
  last_checked: string;
  status: boolean;
  set: (data: Partial<CurrentSite>) => void;
}

export const useSetCurrentSite = create<CurrentSite>()(
  persist(
    (set) => ({
      id: -1,
      title: '',
      url: '',
      last_checked: '',
      status: false,
      set: (data) => set((state) => ({ ...state, ...data })),
    }),
    {
      name: "current-site",
    }
  )
);

interface SiteTrigger { 
  id: number;
  set: (value: number) => void; // must provide a value
}

export const useAdditionalSiteTrigger = create<SiteTrigger>((set) => ({
  id: 0,
  set: (value: number) =>
    {
      set(() => ({ id: value }))
    }
}));