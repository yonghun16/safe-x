import { AlertCircle } from '../ui/Icons';
import type { ToastState } from '../../hooks/useToast';

interface ToastProps {
  toast: ToastState;
}

const Toast = ({ toast }: ToastProps) => {
  return (
    <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
      <AlertCircle />
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
