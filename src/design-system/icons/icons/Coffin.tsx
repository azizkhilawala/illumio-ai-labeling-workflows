import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Coffin: React.FC<IconComponentProps> = ({
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
        <><path d="M9 3H15L20 8L15 21H9L4 8L9 3Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.29292 2.29289C8.48046 2.10536 8.73481 2 9.00003 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289L20.7071 7.29289C20.9866 7.57233 21.0752 7.99013 20.9334 8.35898L15.9334 21.359C15.7848 21.7452 15.4138 22 15 22H9.00003C8.58626 22 8.21522 21.7452 8.06668 21.359L3.06668 8.35898C2.92482 7.99013 3.01348 7.57233 3.29292 7.29289L8.29292 2.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('coffin', Coffin);
