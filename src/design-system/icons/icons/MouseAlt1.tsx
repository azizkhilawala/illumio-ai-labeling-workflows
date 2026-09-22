import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MouseAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M12 3V9M12 3C15.3137 3 18 5.68629 18 9M12 3C8.68629 3 6 5.68629 6 9M6 9H18M6 9V15C6 18.3137 8.68629 21 12 21C15.3137 21 18 18.3137 18 15V9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2.07086C7.93431 2.50937 5.5094 4.93428 5.07089 7.99997H11V2.07086Z" fill={color}/>
<path d="M5 9.99997V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9.99997H5Z" fill={color}/>
<path d="M18.9291 7.99997H13V2.07086C16.0657 2.50937 18.4906 4.93428 18.9291 7.99997Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mouse-alt-1', MouseAlt1);
