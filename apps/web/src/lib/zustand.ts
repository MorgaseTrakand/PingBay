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
  id: number | string,
  title: string;
  url: string;
  last_checked: string;
  status: boolean
  set: (id: number | string, title: string, url: string, last_checked: string, status: boolean) => void;
}

export const useSetCurrentSite = create<CurrentSite>()(
  persist(
    (set) => ({
      id: -1,
      title: '',
      url: '',
      last_checked: '',
      status: false,
      set: (id: number | string, title: string, url: string, last_checked: string, status: boolean) => set(() => ({ id: id, title: title, url: url, last_checked: last_checked, status: status}))
    }),
    {
      name: "current-site"
    }
  )
);