import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | AnchorProps;

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  iconPosition = 'right',
  ...rest
}: Props) {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon">{icon}</span>}
    </>
  );

  if ('href' in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
