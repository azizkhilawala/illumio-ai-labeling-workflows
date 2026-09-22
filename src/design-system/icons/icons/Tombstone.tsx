import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Tombstone: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V17M9 10H15M19 21V10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10V21M3 21H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58172 2 4 5.58172 4 10V20H3C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H20V10C20 5.58172 16.4183 2 12 2ZM12 6C12.5523 6 13 6.44772 13 7V9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V11H9C8.44772 11 8 10.5523 8 10C8 9.44772 8.44772 9 9 9H11V7C11 6.44772 11.4477 6 12 6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('tombstone', Tombstone);
