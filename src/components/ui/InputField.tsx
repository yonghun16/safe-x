import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  error?: string;
  rightAction?: ReactNode;
}

const InputField = ({
  icon,
  error,
  rightAction,
  className = '',
  ...props
}: InputFieldProps) => {
  return (
    <div className="input-icon-wrapper">
      {icon && <span className="input-left-icon">{icon}</span>}
      <input
        className={`input-field ${error ? 'error' : ''} ${className}`.trim()}
        {...props}
      />
      {rightAction}
    </div>
  );
};

export default InputField;
