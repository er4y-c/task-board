import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthState {
  token: string | null;
  user: User | null;
  setToken: (data: { token: string }) => void;
  setUser: (data: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (data) => {
        set({ token: data.token });
      },
      setUser: (data) => {
        set({ user: data });
      },
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
