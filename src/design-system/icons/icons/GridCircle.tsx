import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GridCircle: React.FC<IconComponentProps> = ({
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
        <><path d="M4 7C4 5.34315 5.34315 4 7 4C8.65685 4 10 5.34315 10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 4.79086 4.79086 3 7 3C9.20914 3 11 4.79086 11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7ZM13 7C13 4.79086 14.7909 3 17 3C19.2091 3 21 4.79086 21 7C21 9.20914 19.2091 11 17 11C14.7909 11 13 9.20914 13 7ZM3 17C3 14.7909 4.79086 13 7 13C9.20914 13 11 14.7909 11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17ZM13 17C13 14.7909 14.7909 13 17 13C19.2091 13 21 14.7909 21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('grid-circle', GridCircle);
