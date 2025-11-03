import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'outline';
  inputSize?: 'sm' | 'md' | 'lg';
}

export default function Input({
  label,
  error,
  variant = 'default',
  inputSize = 'md',
  className = '',
  disabled,
  ...props
}: InputProps) {
  const base = 'rounded-lg w-full focus:outline-none transition-colors placeholder-gray-400';

  const variants = {
    default: 'border border-gray-300 focus:border-blue-500 bg-white',
    outline: 'border-2 border-blue-500 bg-transparent focus:border-blue-600',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const disabledClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200';

  const appliedClasses = `
    ${base}
    ${sizes[inputSize]}
    ${disabled ? disabledClasses : variants[variant]}
    ${error ? 'border-red-500 focus:border-red-600' : ''}
    ${className}
  `;

  return (
    <div className="flex flex-col gap-1">
      {/* Label */}
      {label && <label className="text-sm text-gray-600 font-medium">{label}</label>}

      {/* Input */}
      <input className={appliedClasses} disabled={disabled} {...props} />

      {/* Error Message */}
      {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
    </div>
  );
}
