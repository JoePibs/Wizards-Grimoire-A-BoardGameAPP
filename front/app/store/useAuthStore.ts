import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { id: number; token: string } | null;
  login: (token: string, userId: number) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (token, userId) => set({ user: { id: userId, token } }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-storage' } 
  )
);
