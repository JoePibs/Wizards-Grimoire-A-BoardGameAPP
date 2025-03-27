"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { id: number; token: string } | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (token: string, userId: number) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      login: (token, userId) => {
        set({ user: { id: userId, token }, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      setHydrated: () => {
        const user = get().user;
        set({ isHydrated: true, isAuthenticated: !!user?.token });
      },
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(); // appelé automatiquement après réhydratation
      },
    }
  )
);
