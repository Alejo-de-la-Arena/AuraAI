import { cn } from '@/lib/utils';

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2',
        'text-eyebrow text-cyan-aura',
        'bg-cyan-aura/[0.08] border border-cyan-aura/20',
        'rounded-full px-3 py-1',
        className
      )}
    >
      {children}
    </span>
  );
}
