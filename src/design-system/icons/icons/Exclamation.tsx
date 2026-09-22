import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Exclamation: React.FC<IconComponentProps> = ({
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
        <><path d="M12 5V15M12 19H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 4C11.4477 4 11 4.44771 11 5V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V5C13 4.44772 12.5523 4 12 4Z" fill={color}/>
<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('exclamation', Exclamation);
