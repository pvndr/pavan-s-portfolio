import type { ReactNode } from 'react';
import './Badge.css';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'mono';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  pulsing?: boolean;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  dot = false,
  pulsing = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant} ${className}`.trim()}>
      {dot && (
        <span className={`badge__dot ${pulsing ? 'badge__dot--pulsing' : ''}`} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}
