import type { ReactNode } from "react";
import clsx from "clsx";
import { Check } from "./Icons";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  className?: "remember-me" | "terms-checkbox";
}

/**
 * 체크박스를 렌더링하는 공통 컴포넌트
 *
 * @remarks
 * 체크 상태를 제어하는 Controlled Component이다.
 * 체크 여부는 `checked` 속성으로 전달받으며,
 * 사용자의 입력은 `onChange` 콜백을 통해 부모 컴포넌트에 전달된다.
 */
const Checkbox = ({
  checked,
  onChange,
  label,
  className = "remember-me",
}: CheckboxProps) => {
  return (
    <label className={clsx(className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox-custom">
        <Check />
      </span>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
