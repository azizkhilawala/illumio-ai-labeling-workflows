import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChevronUpLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M7 17V7.00001L17 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 8.00001L17 8C17.5523 8 18 7.55228 18 7C18 6.44771 17.5523 6 17 6L7 6.00001C6.44771 6.00001 6 6.44772 6 7.00001V17C6 17.5523 6.44772 18 7 18C7.55228 18 8 17.5523 8 17V8.00001Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chevron-up-left', ChevronUpLeft);
