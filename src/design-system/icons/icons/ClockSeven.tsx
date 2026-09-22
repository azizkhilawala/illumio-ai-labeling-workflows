import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockSeven: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13.0002 7C13.0002 6.44772 12.5524 6 12.0002 6C11.4479 6 11.0002 6.44772 11.0002 7V11.723L9.64266 13.9855C9.35851 14.4591 9.51207 15.0733 9.98566 15.3575C10.4592 15.6416 11.0735 15.4881 11.3576 15.0145L12.8576 12.5145C12.9509 12.3591 13.0002 12.1812 13.0002 12V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-seven', ClockSeven);
