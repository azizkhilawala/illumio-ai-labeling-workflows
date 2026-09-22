import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Left: React.FC<IconComponentProps> = ({
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
<path d="M7.46665 8.97996L11.35 5.09329L9.92332 3.66663L4.60999 8.97996L9.96332 14.3333L11.39 12.9066L7.46665 8.97996Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('left', Left);
