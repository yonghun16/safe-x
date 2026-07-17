import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

/**
 * 앱에서 사용하는 기본 버튼 컴포넌트
 *
 * @remarks
 * HTML `<button>` 요소를 확장한 컴포넌트로,
 * 로딩 상태를 지원하며 로딩 중에는 버튼을 비활성화하고
 * 스피너와 함께 로딩 텍스트를 표시한다.
 */
const Button = ({
  isLoading = false,
  loadingText,
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx("btn-primary", className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="spinner" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
