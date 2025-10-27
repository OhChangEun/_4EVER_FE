interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function IconButton({
  label,
  icon,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg font-semibold focus:outline-none transition cursor-pointer whitespace-nowrap';

  const variants = {
    primary: 'bg-blue-500 text-white hover:opacity-85',
    secondary: 'bg-gray-200 text-gray-500 hover:bg-gray-300',
    outline: 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-50',
    whiteOutline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const sizes = {
    sm: { px: 'px-2', py: 'py-1', text: 'text-sm', square: 'w-8 h-8' },
    md: { px: 'px-3', py: 'py-1.5', text: 'text-base', square: 'w-10 h-10' },
    lg: { px: 'px-4', py: 'py-2', text: 'text-lg', square: 'w-12 h-12' },
  };

  const iconSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  // 아이콘만 있으면 정사각형
  const isIconOnly = !label;

  const variantClasses = 'bg-gray-400 text-gray-800 opacity-30 pointer-events-none'; // disabled용 배경/텍스트

  return (
    <button
      className={`
        ${base} 
        ${isIconOnly ? sizes[size].square : `${sizes[size].px} ${sizes[size].py}`} 
        ${sizes[size].text}
        ${props.disabled ? variantClasses : variants[variant]} 
        ${className}
      `}
      {...props}
    >
      <i className={`${icon} ${iconSizes[size]} ${label ? 'pr-1' : ''}`}></i>
      {label && <span className="pr-1">{label}</span>}
    </button>
  );
}
