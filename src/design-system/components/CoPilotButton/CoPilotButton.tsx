import React from 'react';
import { Stars } from '@/design-system/icons/icons';
import './copilot-button.css';

export type CoPilotButtonSize = 'sm' | 'md' | 'lg';

export type CoPilotButtonProps = {
  size?: CoPilotButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
};

export const CoPilotButton: React.FC<CoPilotButtonProps> = ({
  size = 'md',
  onClick,
  disabled = false,
  ariaLabel = 'Open CoPilot',
  className = '',
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;

  const classes = [
    'ds-copilot-button',
    `ds-copilot-button--${size}`,
    disabled ? 'ds-copilot-button--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <Stars variant="solid" size={iconSize} color="white" />
    </button>
  );
};
