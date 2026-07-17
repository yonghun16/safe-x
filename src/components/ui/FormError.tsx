import type { ReactNode } from "react";
import clsx from "clsx";
import { AlertCircle } from "./Icons";

interface FormErrorProps {
  message?: string;
}

/**
 * 폼 입력 오류 메시지를 표시하는 컴포넌트
 *
 * @remarks
 * `message`가 없으면 아무것도 렌더링하지 않는다.
 */
const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className={clsx("error-message")}>
      <AlertCircle />
      <span>{message}</span>
    </div>
  );
};

interface FormGroupProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

/**
 * 폼 입력 요소를 그룹화하는 레이아웃 컴포넌트
 *
 * @remarks
 * 라벨, 입력 요소, 오류 메시지를 하나의 그룹으로 구성한다.
 * 오류 메시지는 `error`가 전달된 경우에만 표시된다.
 */
export const FormGroup = ({
  label,
  error,
  children,
}: FormGroupProps) => {
  return (
    <div className={clsx("form-group")}>
      {label && <label className={clsx("report-label")}>{label}</label>}
      {children}
      <FormError message={error} />
    </div>
  );
};

export default FormError;
