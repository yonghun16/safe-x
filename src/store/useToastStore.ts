import { create } from 'zustand';

export type ToastType = 'success' | 'error';

export interface ToastState {
  message: string;
  type: ToastType;
}

interface ToastStore {
  toast: ToastState | null;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

let toastTimeout: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = create<ToastStore>((set) => ({
  toast: null,

  showToast: (message, type = 'success') => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    set({ toast: { message, type } });

    toastTimeout = setTimeout(() => {
      set({ toast: null });
      toastTimeout = null;
    }, 2500);
  },

  hideToast: () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }
    set({ toast: null });
  },
}));
