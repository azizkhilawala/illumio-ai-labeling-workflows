import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Down: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M8.98002 9.53332L5.09335 5.64999L3.66669 7.07665L8.98002 12.39L14.3334 7.03665L12.9067 5.60999L8.98002 9.53332Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('down', Down);
