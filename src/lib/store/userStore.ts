import { User } from "@/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";
import { persist } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (userData: User) => void;
  initializeUser: () => void;
  exit: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) =>
        set({
          user: userData,
        }),
      initializeUser: () => {
        const userCookie = Cookies.get("session");

        userCookie &&
          set({
            user: JSON.parse(userCookie),
          });
      },
      exit: () => set({ user: null }),
    }),
    {
      name: "user-store", // Nome no localStorage
      partialize: (state) => ({ user: state.user }), // Salva apenas o estado do usuário
    }
  )
);