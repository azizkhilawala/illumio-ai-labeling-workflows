import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SlidersSimple: React.FC<IconComponentProps> = ({
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
        <><path d="M8 8.5C8 9.88071 6.88071 11 5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6C6.88071 6 8 7.11929 8 8.5ZM8 8.5H21M16 15.5C16 16.8807 17.1193 18 18.5 18C19.8807 18 21 16.8807 21 15.5C21 14.1193 19.8807 13 18.5 13C17.1193 13 16 14.1193 16 15.5ZM16 15.5H3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 8.5C2 6.567 3.567 5 5.5 5C7.08551 5 8.42479 6.05426 8.85506 7.5H21C21.5523 7.5 22 7.94772 22 8.5C22 9.05228 21.5523 9.5 21 9.5H8.85506C8.42479 10.9457 7.08551 12 5.5 12C3.567 12 2 10.433 2 8.5ZM15.1449 14.5C15.5752 13.0543 16.9145 12 18.5 12C20.433 12 22 13.567 22 15.5C22 17.433 20.433 19 18.5 19C16.9145 19 15.5752 17.9457 15.1449 16.5H3C2.44772 16.5 2 16.0523 2 15.5C2 14.9477 2.44772 14.5 3 14.5H15.1449Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('sliders-simple', SlidersSimple);
