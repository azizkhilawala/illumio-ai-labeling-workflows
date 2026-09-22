import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const VirtualServer: React.FC<IconComponentProps> = ({
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
<path d="M9.2 2.80005L2.8 9.20005L9.2 15.6L15.6 9.20005L9.2 2.80005Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('virtual-server', VirtualServer);
