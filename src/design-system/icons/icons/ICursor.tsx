import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ICursor: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V17M12 7C12 4.79086 10.2091 3 8 3H7M12 7C12 4.79086 13.7909 3 16 3H17M12 17C12 19.2091 10.2091 21 8 21H7M12 17C12 19.2091 13.7909 21 16 21H17M9 12H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 2.44772 6.44772 2 7 2H8C9.6356 2 11.0878 2.78534 12 3.99951C12.9122 2.78534 14.3644 2 16 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H16C14.3431 4 13 5.34315 13 7V11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H13V17C13 18.6569 14.3431 20 16 20H17C17.5523 20 18 20.4477 18 21C18 21.5523 17.5523 22 17 22H16C14.3644 22 12.9122 21.2147 12 20.0005C11.0878 21.2147 9.6356 22 8 22H7C6.44772 22 6 21.5523 6 21C6 20.4477 6.44772 20 7 20H8C9.65685 20 11 18.6569 11 17V13H9C8.44772 13 8 12.5523 8 12C8 11.4477 8.44772 11 9 11H11V7C11 5.34315 9.65685 4 8 4H7C6.44772 4 6 3.55228 6 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('i-cursor', ICursor);
