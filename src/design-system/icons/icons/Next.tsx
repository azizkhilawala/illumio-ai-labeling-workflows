import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Next: React.FC<IconComponentProps> = ({
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
<path d="M10.5333 8.97996L6.64999 5.09329L8.07665 3.66663L13.39 8.97996L8.03665 14.3333L6.60999 12.9066L10.5333 8.97996Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('next', Next);
