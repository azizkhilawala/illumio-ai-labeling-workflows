import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockTwoThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L14.5 10.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM15.0145 11.3576C15.4881 11.0735 15.6416 10.4592 15.3575 9.98566C15.0733 9.51207 14.4591 9.35851 13.9855 9.64266L11.4855 11.1427C11.1843 11.3234 11 11.6489 11 12.0002V17.0002C11 17.5524 11.4477 18.0002 12 18.0002C12.5523 18.0002 13 17.5524 13 17.0002V12.5663L15.0145 11.3576Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-two-thirty', ClockTwoThirty);
