import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ExclamationAlt: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M12.01 20H12M12 14L12.01 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 3C11.4477 3 11 3.44772 11 4V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V4C13 3.44772 12.5523 3 12 3Z" fill={color}/>
<path d="M12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('exclamation-alt', ExclamationAlt);
