'use client';

import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-sm transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-cyan-aura disabled:opacity-50 disabled:pointer-events-none',
          variant === 'primary' && [
            'text-aura-950',
            'shadow-[0_0_20px_rgba(0,229,255,0.25)]',
            'hover:brightness-110 hover:scale-[1.02]',
            'active:scale-[0.99]',
          ],
          variant === 'secondary' && [
            'bg-transparent border border-cyan-aura/25 text-zinc-50',
            'hover:bg-cyan-aura/5 hover:border-cyan-aura/50',
            'active:scale-[0.99]',
          ],
          size === 'sm' && 'text-sm px-5 py-2.5',
          size === 'md' && 'text-sm px-6 py-3',
          size === 'lg' && 'text-base px-8 py-3.5',
          className
        )}
        style={
          variant === 'primary'
            ? { background: 'linear-gradient(135deg, #00E5FF 0%, #00FF88 100%)' }
            : undefined
        }
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
