import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Thumbtack: React.FC<IconComponentProps> = ({
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
        <><path d="M7.99927 3V8.5C6.17801 9.86834 5 12.0466 5 14.5V15H12H19V14.5C19 12.0466 17.822 9.86834 16.0007 8.5V3M6 3H18M12 10V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M5 3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3C19 3.55228 18.5523 4 18 4H16.0007V8.5C17.822 9.86834 19 12.0466 19 14.5C19 14.7761 18.7761 15 18.5 15H5.5C5.22386 15 5 14.7761 5 14.5C5 12.0466 6.17801 9.86834 7.99927 8.5V4H6C5.44772 4 5 3.55228 5 3Z" fill={color}/>
<path d="M11 21V17H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('thumbtack', Thumbtack);
