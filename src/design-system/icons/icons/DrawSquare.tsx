import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DrawSquare: React.FC<IconComponentProps> = ({
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
        <><path d="M16 18.5C16 19.8807 17.1193 21 18.5 21C19.8807 21 21 19.8807 21 18.5C21 17.1193 19.8807 16 18.5 16M16 18.5C16 17.1193 17.1193 16 18.5 16M16 18.5H8M18.5 16V8M8 18.5C8 19.8807 6.88071 21 5.5 21C4.11929 21 3 19.8807 3 18.5C3 17.1193 4.11929 16 5.5 16M8 18.5C8 17.1193 6.88071 16 5.5 16M5.5 16V8M5.5 8C4.11929 8 3 6.88071 3 5.5C3 4.11929 4.11929 3 5.5 3C6.88071 3 8 4.11929 8 5.5M5.5 8C6.88071 8 8 6.88071 8 5.5M8 5.5H16M18.5 8C17.1193 8 16 6.88071 16 5.5M18.5 8C19.8807 8 21 6.88071 21 5.5C21 4.11929 19.8807 3 18.5 3C17.1193 3 16 4.11929 16 5.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 5.5C2 3.567 3.567 2 5.5 2C7.08551 2 8.42479 3.05426 8.85506 4.5H15.1449C15.5752 3.05426 16.9145 2 18.5 2C20.433 2 22 3.567 22 5.5C22 7.08551 20.9457 8.42479 19.5 8.85506V15.1449C20.9457 15.5752 22 16.9145 22 18.5C22 20.433 20.433 22 18.5 22C16.9145 22 15.5752 20.9457 15.1449 19.5H8.85506C8.42479 20.9457 7.08551 22 5.5 22C3.567 22 2 20.433 2 18.5C2 16.9145 3.05426 15.5752 4.5 15.1449V8.85506C3.05426 8.42479 2 7.08551 2 5.5ZM6.5 8.85506V15.1449C7.62889 15.4809 8.51909 16.3711 8.85506 17.5H15.1449C15.4809 16.3711 16.3711 15.4809 17.5 15.1449V8.85506C16.3711 8.51909 15.4809 7.62889 15.1449 6.5H8.85506C8.51909 7.62889 7.62889 8.51909 6.5 8.85506Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('draw-square', DrawSquare);
