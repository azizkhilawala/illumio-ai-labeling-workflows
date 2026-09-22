import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Clock: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.3513 11.1843 12.6768 11.4855 12.8575L13.9855 14.3575C14.4591 14.6416 15.0733 14.4881 15.3575 14.0145C15.6416 13.5409 15.4881 12.9267 15.0145 12.6425L13 11.4338V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock', Clock);
