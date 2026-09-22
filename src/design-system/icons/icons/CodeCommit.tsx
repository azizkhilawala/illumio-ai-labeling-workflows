import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CodeCommit: React.FC<IconComponentProps> = ({
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
        <><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12M15 12H21M9 12H3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.12602 11C8.57006 9.27477 10.1362 8 12 8C13.8638 8 15.4299 9.27477 15.874 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H15.874C15.4299 14.7252 13.8638 16 12 16C10.1362 16 8.57006 14.7252 8.12602 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H8.12602Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('code-commit', CodeCommit);
