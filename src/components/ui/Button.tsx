'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-xl',
      'transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
    );

    const variantStyles = {
      primary: cn(
        'bg-primary-500 text-white',
        'hover:bg-primary-600 hover:shadow-md',
        'active:bg-primary-700 active:scale-[0.98]',
        'focus-visible:ring-primary-500'
      ),
      secondary: cn(
        'bg-neutral-100 text-neutral-800',
        'hover:bg-neutral-200 hover:shadow-sm',
        'active:bg-neutral-300 active:scale-[0.98]',
        'focus-visible:ring-neutral-400'
      ),
      ghost: cn(
        'bg-transparent text-neutral-700',
        'hover:bg-neutral-100',
        'active:bg-neutral-200 active:scale-[0.98]',
        'focus-visible:ring-neutral-400'
      ),
      outline: cn(
        'bg-transparent text-neutral-700',
        'border border-neutral-200',
        'hover:bg-neutral-50 hover:border-neutral-300',
        'active:bg-neutral-100 active:scale-[0.98]',
        'focus-visible:ring-neutral-400'
      ),
      danger: cn(
        'bg-error text-white',
        'hover:bg-red-600 hover:shadow-md',
        'active:bg-red-700 active:scale-[0.98]',
        'focus-visible:ring-error'
      ),
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <LoadingSpinner className="h-4 w-4" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

function LoadingSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('animate-spin', className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button };
