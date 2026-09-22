import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleQuarters: React.FC<IconComponentProps> = ({
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
        <><path d="M18.3689 5.64103L5.63548 18.3634M5.63106 5.64103L18.3645 18.3634M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM6.343 6.34329C4.89537 7.791 4 9.79094 4 12C4 14.2091 4.89537 16.209 6.343 17.6567L11.9997 12L17.6567 17.657C19.1045 16.2093 20 14.2092 20 12C20 9.79078 19.1045 7.79072 17.6567 6.343L11.9997 12L6.343 6.34329Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-quarters', CircleQuarters);
