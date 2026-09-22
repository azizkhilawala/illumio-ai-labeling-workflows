import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockTwo: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.3603 11.1938 12.6927 11.5073 12.8702C11.8208 13.0477 12.2056 13.0429 12.5145 12.8575L15.0145 11.3575C15.4881 11.0733 15.6416 10.4591 15.3575 9.9855C15.0733 9.51192 14.4591 9.35836 13.9855 9.64251L13 10.2338V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-two', ClockTwo);
