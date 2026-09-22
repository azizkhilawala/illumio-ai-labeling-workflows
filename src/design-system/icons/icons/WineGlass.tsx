import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WineGlass: React.FC<IconComponentProps> = ({
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
        <><path d="M12 13V21M12 13C15.3137 13 18 10.3137 18 7V3H6V7C6 10.3137 8.68629 13 12 13ZM8 21H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M5 3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3V7C19 10.5265 16.3923 13.4439 13 13.9291V20H16C16.5523 20 17 20.4477 17 21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21C7 20.4477 7.44772 20 8 20H11V13.9291C7.60771 13.4439 5 10.5265 5 7V3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('wine-glass', WineGlass);
