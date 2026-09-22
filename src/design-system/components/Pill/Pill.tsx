import React from 'react';
import { Icon } from '@/design-system/icons';
import { PillIcon, type LabelType, type PillIconName } from '@/design-system/pill-icons';
import './pill.css';

type PillVariant = 'default' | 'new' | 'warning' | 'error' | 'deleted';

type PillProps = {
  variant?: PillVariant;
  children: React.ReactNode;
  /** Custom icon element - takes precedence over labelType/pillIconName */
  icon?: React.ReactNode;
  /** Label type for automatic PillIcon coloring (app, role, env, loc) */
  labelType?: LabelType;
  /** Specific PillIcon name - defaults to labelType value if not provided */
  pillIconName?: PillIconName;
  showCloseButton?: boolean;
  onClose?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

type PillGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export const Pill: React.FC<PillProps> = ({
  variant = 'default',
  children,
  icon,
  labelType,
  pillIconName,
  showCloseButton = true,
  onClose,
  onClick,
  disabled = false,
  className = '',
}) => {
  const pillClasses = [
    'ds-pill',
    `ds-pill--${variant}`,
    disabled ? 'ds-pill--disabled' : '',
    onClick ? 'ds-pill--clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onClose) {
      onClose();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={pillClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
    >
      {icon !== undefined ? (
        icon && <span className="ds-pill__icon">{icon}</span>
      ) : (
        <span className="ds-pill__icon">
          <PillIcon
            name={pillIconName || labelType || 'loc'}
            labelType={labelType}
            size={12}
          />
        </span>
      )}
      <span className="ds-pill__text">{children}</span>
      {showCloseButton && onClose && (
        <button
          type="button"
          className="ds-pill__close"
          onClick={handleClose}
          aria-label="Remove"
          disabled={disabled}
        >
          <Icon name="xmark" size={8} />
        </button>
      )}
    </div>
  );
};

export const PillGroup: React.FC<PillGroupProps> = ({
  children,
  className = '',
}) => {
  const groupClasses = ['ds-pill-group', className].filter(Boolean).join(' ');

  return <div className={groupClasses}>{children}</div>;
};

export type { PillProps, PillVariant, PillGroupProps };
