import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChevronDownLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M17 17H7L7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16H8V7C8 6.44771 7.55228 6 7 6C6.44772 6 6 6.44771 6 7V17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chevron-down-left', ChevronDownLeft);
