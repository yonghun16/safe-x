import type { ReactNode } from 'react';
import { Check } from './Icons';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  className?: 'remember-me' | 'terms-checkbox';
}

const Checkbox = ({ checked, onChange, label, className = 'remember-me' }: CheckboxProps) => {
  return (
    <label className={className}>
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
