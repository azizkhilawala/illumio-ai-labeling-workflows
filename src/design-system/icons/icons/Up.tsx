import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Up: React.FC<IconComponentProps> = ({
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
<path d="M9.02 8.46665L12.9067 12.35L14.3333 10.9233L9.02 5.60999L3.66667 10.9633L5.09333 12.39L9.02 8.46665Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('up', Up);
