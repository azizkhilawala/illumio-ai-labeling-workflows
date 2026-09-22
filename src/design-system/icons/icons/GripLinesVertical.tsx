import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GripLinesVertical: React.FC<IconComponentProps> = ({
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
        <><path d="M14 4V20M10 4V20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10 3C10.5523 3 11 3.44772 11 4V20C11 20.5523 10.5523 21 10 21C9.44772 21 9 20.5523 9 20V4C9 3.44772 9.44772 3 10 3ZM14 3C14.5523 3 15 3.44772 15 4V20C15 20.5523 14.5523 21 14 21C13.4477 21 13 20.5523 13 20V4C13 3.44772 13.4477 3 14 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('grip-lines-vertical', GripLinesVertical);
