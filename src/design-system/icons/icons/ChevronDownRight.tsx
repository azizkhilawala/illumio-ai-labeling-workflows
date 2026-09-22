import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChevronDownRight: React.FC<IconComponentProps> = ({
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
        <><path d="M17 7V17H7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V7C18 6.44771 17.5523 6 17 6C16.4477 6 16 6.44771 16 7V16H7C6.44772 16 6 16.4477 6 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chevron-down-right', ChevronDownRight);
