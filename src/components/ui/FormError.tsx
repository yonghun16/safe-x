import type { ReactNode } from 'react';
import { AlertCircle } from './Icons';

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <AlertCircle /> {message}
    </div>
  );
};

interface FormGroupProps {
  label?: string;
  error?: string;
  children: ReactNode;
}

export const FormGroup = ({ label, error, children }: FormGroupProps) => {
  return (
    <div className="form-group">
      {label && <label className="report-label">{label}</label>}
      {children}
      <FormError message={error} />
    </div>
  );
};

export default FormError;
