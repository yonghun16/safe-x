import { create } from 'zustand';

interface AuthStore {
  email: string;
  name: string;
  rememberMe: boolean;
  authReady: boolean;
  setUser: (email: string, name: string) => void;
  setLoginEmail: (email: string) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setAuthReady: (authReady: boolean) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  email: '',
  name: '',
  rememberMe: false,
  authReady: false,

  setUser: (email, name) => set({ email, name }),
  setLoginEmail: (email) => set({ email }),
  setRememberMe: (rememberMe) => set({ rememberMe }),
  setAuthReady: (authReady) => set({ authReady }),
  clearUser: () => set({ email: '', name: '' }),
}));
