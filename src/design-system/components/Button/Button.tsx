import React from 'react';
import { Icon } from '@/design-system/icons';
import './button.css';

type ButtonVariant =
  | 'primary'
  | 'primary-outlined'
  | 'primary-ghost'
  | 'secondary'
  | 'secondary-outlined'
  | 'secondary-ghost'
  // Legacy aliases for backward compatibility
  | 'outline'
  | 'ghost';

type ButtonSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = React.PropsWithChildren<{
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: 'button' | 'a';
  href?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler;
}>;

// Map legacy variant names to new names
const normalizeVariant = (variant: ButtonVariant): string => {
  switch (variant) {
    case 'outline':
      return 'primary-outlined';
    case 'ghost':
      return 'primary-ghost';
    default:
      return variant;
  }
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  leftIcon,
  rightIcon,
  iconOnly = false,
  disabled = false,
  loading = false,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const normalizedVariant = normalizeVariant(variant);

  const classes = [
    'ds-btn',
    `ds-btn--${normalizedVariant}`,
    `ds-btn--${size}`,
    iconOnly ? 'ds-btn--icon-only' : '',
    disabled ? 'ds-btn--disabled' : '',
    loading ? 'ds-btn--loading' : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && (
        <span className="ds-btn__spinner" aria-hidden="true">
          <Icon name="loader" size={16} />
        </span>
      )}
      {!loading && iconOnly && (leftIcon || rightIcon) && (
        <span className="ds-btn__icon">{leftIcon || rightIcon}</span>
      )}
      {!loading && !iconOnly && leftIcon && <span className="ds-btn__icon ds-btn__icon--left">{leftIcon}</span>}
      {!iconOnly && <span className="ds-btn__label">{children}</span>}
      {!loading && !iconOnly && rightIcon && <span className="ds-btn__icon ds-btn__icon--right">{rightIcon}</span>}
    </>
  );

  if (as === 'a') {
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        onClick={disabled ? undefined : onClick}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      type="button"
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export type { ButtonVariant, ButtonSize, ButtonProps };
