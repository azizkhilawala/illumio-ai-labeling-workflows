import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockFiveThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12.8575 11.4856C12.6262 11.1002 12.1662 10.9164 11.7331 11.0364C11.2999 11.1564 11 11.5506 11 12.0001V17.0001C11 17.5524 11.4477 18.0001 12 18.0001C12.5523 18.0001 13 17.5524 13 17.0001V15.3663C13.3043 15.5416 13.692 15.5511 14.0145 15.3576C14.4881 15.0734 14.6416 14.4592 14.3575 13.9856L12.8575 11.4856Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-five-thirty', ClockFiveThirty);
