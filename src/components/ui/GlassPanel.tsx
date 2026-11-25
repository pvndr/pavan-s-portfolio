import type { ReactNode, CSSProperties } from 'react';
import './GlassPanel.css';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  accentBorder?: boolean;
  hover?: boolean;
  style?: CSSProperties;
  as?: 'div' | 'article' | 'section' | 'li';
}

export function GlassPanel({
  children,
  className = '',
  accentBorder = false,
  hover = false,
  style,
  as: Tag = 'div',
}: GlassPanelProps) {
  const classes = [
    'glass-panel',
    accentBorder ? 'glass-panel--accent' : '',
    hover ? 'glass-panel--hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
}
