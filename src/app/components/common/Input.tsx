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
  const base = ' w-full text-gray-800 focus:outline-none transition-colors placeholder-gray-300';

  const variants = {
    default: 'border border-gray-300 focus:border-gray-500 bg-white',
    outline: 'border border-blue-500 bg-transparent focus:ring focus:ring-blue-500',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs rounded-sm',
    md: 'px-3 py-1.5 text-sm rounded-md',
    lg: 'px-4 py-2 text-lg rounded-lg',
  };

  const disabledClasses = 'bg-gray-100 text-gray-400 border-gray-200';

  const appliedClasses = `
    ${base}
    ${sizes[inputSize]}
    ${disabled ? disabledClasses : variants[variant]}
    ${error ? 'border-red-500 focus:border-red-500' : ''}
    ${className}
  `;

  return (
    <div className="flex flex-col">
      {/* Label */}
      {label && <label className="ml-1 mb-2 text-[13px] text-gray-500">{label}</label>}
      {/* Input */}
      <input className={appliedClasses} disabled={disabled} {...props} />
      {/* Error Message */}
      <div className="min-h-[12px]">
        {error && <span className="ml-1 text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
}
