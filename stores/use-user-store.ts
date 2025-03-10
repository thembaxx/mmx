import { create } from "zustand";

interface UserData {
  id: string;
  email: string;
  name: string;
  image: string | null | undefined;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStore {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  clearUser: () => void;
  updateUserOnboarding: (onboardingComplete: boolean) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUserOnboarding: (onboardingComplete) => {
    set((state) => ({
      user: state.user ? { ...state.user, onboardingComplete } : null,
    }));
  },
}));
