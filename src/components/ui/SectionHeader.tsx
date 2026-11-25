import type { ReactNode } from 'react';
import './SectionHeader.css';
import { MotionWrapper } from '../motion/MotionWrapper';
import { fadeUp } from '../motion/variants';

interface SectionHeaderProps {
  coordinate: string;     // e.g. "§01"
  label: string;          // e.g. "WORK"
  headline: string;
  subtext?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  coordinate,
  label,
  headline,
  subtext,
  align = 'left',
  className = '',
  children,
}: SectionHeaderProps) {
  return (
    <div className={`section-header section-header--${align} ${className}`.trim()}>
      <MotionWrapper variants={fadeUp}>
        <div className="section-header__meta">
          <span className="section-header__coordinate" aria-hidden="true">
            {coordinate}
          </span>
          <span className="section-header__divider" aria-hidden="true">/</span>
          <span className="section-label section-header__label">{label}</span>
        </div>
        <h2 className="section-header__headline">{headline}</h2>
        {subtext && <p className="section-header__subtext">{subtext}</p>}
        {children}
      </MotionWrapper>
    </div>
  );
}
