import { useToastStore } from '../store/useToastStore';

export type { ToastState, ToastType } from '../store/useToastStore';

export const useToast = () => {
  const toast = useToastStore((state) => state.toast);
  const showToast = useToastStore((state) => state.showToast);

  return { toast, showToast };
};
