import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const AlignLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6ZM2 10C2 9.44772 2.44772 9 3 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H3C2.44772 11 2 10.5523 2 10ZM2 14C2 13.4477 2.44772 13 3 13H21C21.5523 13 22 13.4477 22 14C22 14.5523 21.5523 15 21 15H3C2.44772 15 2 14.5523 2 14ZM2 18C2 17.4477 2.44772 17 3 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H3C2.44772 19 2 18.5523 2 18Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('align-left', AlignLeft);
