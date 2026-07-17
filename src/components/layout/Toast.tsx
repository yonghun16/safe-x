import { AlertCircle } from "../ui/Icons";
import type { ToastState } from "../../hooks/useToast";

interface ToastProps {
  toast: ToastState;
}

/**
 * 토스트 알림을 표시하는 컴포넌트
 *
 * @remarks
 * 전달받은 토스트 상태에 따라 성공(`success`) 또는
 * 오류(`error`) 스타일을 적용하고, 아이콘과 메시지를 함께 표시한다.
 */
const Toast = ({ toast }: ToastProps) => {
  return (
    <div
      className={`toast ${toast.type === "success" ? "toast-success" : "toast-error"
        }`}
    >
      <AlertCircle />
      <span>{toast.message}</span>
    </div>
  );
};

export default Toast;
