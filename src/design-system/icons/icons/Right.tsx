import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Right: React.FC<IconComponentProps> = ({
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
<path d="M10.5333 9.01996L6.64999 12.9066L8.07665 14.3333L13.39 9.01996L8.03665 3.66663L6.60999 5.09329L10.5333 9.01996Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('right', Right);
