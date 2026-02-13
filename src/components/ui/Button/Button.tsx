import type { MouseEvent, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'button';
  variant: 'default' | 'delete' | 'edit' | 'ghost';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick, type, className }) => {
  switch (variant) {
    case 'default':
      return (
        <button type={type} onClick={onClick} className="p-2 w-full rounded-md bg-blue-500 text-white cursor-pointer">
          {children}
        </button>
      );

    case 'delete':
      return (
        <button type={type} onClick={onClick} className="p-2 w-full rounded-md bg-red-500 text-white cursor-pointer">
          {children}
        </button>
      );

    case 'edit':
      return (
        <button type={type} onClick={onClick} className="p-2 w-full rounded-md bg-orange-500 text-white cursor-pointer">
          {children}
        </button>
      );

    case 'ghost':
      return (
        <button type={type} onClick={onClick} className={`bg-transparent text-white cursor-pointer ${className}`}>
          {children}
        </button>
      );
    default:
      break;
  }
};

export default Button;
