import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Pause: React.FC<IconComponentProps> = ({
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
        <><path d="M8 5V19M16 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 4C8.55228 4 9 4.44772 9 5V19C9 19.5523 8.55228 20 8 20C7.44772 20 7 19.5523 7 19V5C7 4.44772 7.44772 4 8 4ZM16 4C16.5523 4 17 4.44772 17 5V19C17 19.5523 16.5523 20 16 20C15.4477 20 15 19.5523 15 19V5C15 4.44772 15.4477 4 16 4Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pause', Pause);
