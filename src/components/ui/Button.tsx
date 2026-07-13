import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
}

const Button = ({
  isLoading = false,
  loadingText,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`btn-primary ${className}`.trim()}
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
