import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  rightAction?: ReactNode;
}

/**
 * 아이콘과 우측 액션을 지원하는 공통 입력 필드 컴포넌트
 *
 * @remarks
 * HTML `<input>` 요소를 확장한 컴포넌트로,
 * 좌측 아이콘과 우측 액션 버튼을 배치할 수 있으며
 * 오류가 발생한 경우 오류 스타일을 적용한다.
 */
const InputField = ({
  icon,
  error,
  rightAction,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div className={clsx("input-icon-wrapper")}>
      {icon && <span className="input-left-icon">{icon}</span>}

      <input
        className={clsx(
          "input-field",
          {
            error: !!error,
          },
          className
        )}
        {...props}
      />

      {rightAction}
    </div>
  );
};

export default InputField;
