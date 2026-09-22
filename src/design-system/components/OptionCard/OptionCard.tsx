import React from 'react';
import { Icon } from '@/design-system/icons';
import './optioncard.css';

type SelectionType = 'checkbox' | 'radio';

type OptionCardProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  selectionType?: SelectionType;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
  value?: string;
  name?: string;
  className?: string;
};

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  icon,
  selected = false,
  selectionType = 'checkbox',
  disabled = false,
  onChange,
  value,
  name,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!selected);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onChange?.(!selected);
    }
  };

  const classes = [
    'ds-option-card',
    selected ? 'ds-option-card--selected' : '',
    disabled ? 'ds-option-card--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role={selectionType === 'radio' ? 'radio' : 'checkbox'}
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      data-value={value}
      data-name={name}
    >
      <div className="ds-option-card__content">
        <div className="ds-option-card__icon-wrapper">
          <span className="ds-option-card__icon">
            {icon || <Icon name="circle-exclamation" size={16} />}
          </span>
        </div>
        <div className="ds-option-card__text">
          <p className="ds-option-card__title">{title}</p>
          {description && (
            <p className="ds-option-card__description">{description}</p>
          )}
        </div>
      </div>

      {selectionType === 'checkbox' ? (
        <div className="ds-option-card__checkbox">
          <span className="ds-option-card__checkmark">
            <Icon name="check" size={10} />
          </span>
        </div>
      ) : (
        <div className="ds-option-card__radio">
          <div className="ds-option-card__radio-dot" />
        </div>
      )}
    </div>
  );
};

// OptionCardGroup for managing multiple options
type OptionCardGroupProps = {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  className?: string;
};

export const OptionCardGroup: React.FC<OptionCardGroupProps> = ({
  children,
  direction = 'vertical',
  className = '',
}) => {
  const classes = [
    'ds-option-card-group',
    direction === 'horizontal' ? 'ds-option-card-group--horizontal' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="group">
      {children}
    </div>
  );
};

export type { OptionCardProps, OptionCardGroupProps, SelectionType };
