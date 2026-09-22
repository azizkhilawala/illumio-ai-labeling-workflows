import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockEightThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13.0002 12C13.0002 11.6397 12.8064 11.3073 12.4928 11.1298C12.1793 10.9523 11.7946 10.9571 11.4857 11.1425L8.98566 12.6425C8.51207 12.9267 8.35851 13.5409 8.64266 14.0145C8.92681 14.4881 9.54107 14.6416 10.0146 14.3575L11.0002 13.7662V17C11.0002 17.5523 11.4479 18 12.0002 18C12.5524 18 13.0002 17.5523 13.0002 17V12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-eight-thirty', ClockEightThirty);
