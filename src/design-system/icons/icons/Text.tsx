import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Text: React.FC<IconComponentProps> = ({
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
        <><path d="M12 3V21M9 21H15M19 6V3H5V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4 3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V6C20 6.55228 19.5523 7 19 7C18.4477 7 18 6.55228 18 6V4H13V20H15C15.5523 20 16 20.4477 16 21C16 21.5523 15.5523 22 15 22H9C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20H11V4H6V6C6 6.55228 5.55228 7 5 7C4.44772 7 4 6.55228 4 6V3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('text', Text);
