import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Enforced: React.FC<IconComponentProps> = ({
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
<path d="M9 3.66663C7.73 4.81996 4.33333 4.81996 4.33333 4.81996L4.36333 9.96663C4.36333 9.96663 5.07999 12.74 9 14.3333C12.92 12.74 13.6367 9.96996 13.6367 9.96996L13.6667 4.81996C13.6667 4.81996 10.27 4.81996 9 3.66663Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('enforced', Enforced);
