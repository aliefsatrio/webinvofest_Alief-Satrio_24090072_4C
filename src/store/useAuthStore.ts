import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,

      login: (userName, token) =>
        set({
          isAuthenticated: true,
          user: userName,
          token,
        }),

      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        }),
    }),
    { name: "auth-storage" }
  )
);