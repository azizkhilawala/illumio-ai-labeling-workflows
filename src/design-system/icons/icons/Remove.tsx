import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Remove: React.FC<IconComponentProps> = ({
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
<path d="M14.3333 8.08337H3.66666V9.91671H14.3333V8.08337Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('remove', Remove);
