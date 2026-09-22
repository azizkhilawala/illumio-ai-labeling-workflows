import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CubeAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M20 4H8.44444L4 8M20 4V15.5556L16 20M20 4L16 8M4 8H16M4 8V20H16M16 20V8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M19.5858 3H8.5C8.25509 3 8.01869 3.08988 7.83564 3.25259L3.6198 7H15.5858L19.5858 3Z" fill={color}/>
<path d="M3 9V20C3 20.5523 3.44772 21 4 21H15V9H3Z" fill={color}/>
<path d="M17 20.3802L20.7474 16.1644C20.9101 15.9813 21 15.7449 21 15.5V4.41421L17 8.41421V20.3802Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cube-alt', CubeAlt);
