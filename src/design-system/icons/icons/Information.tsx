import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Information: React.FC<IconComponentProps> = ({
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
        <><path d="M12.01 19V9M12.01 5H12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill={color}/>
<path d="M12 8C11.4477 8 11 8.44771 11 9V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V9C13 8.44772 12.5523 8 12 8Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('information', Information);
