import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockEight: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V12L9.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13.0002 7C13.0002 6.44772 12.5524 6 12.0002 6C11.4479 6 11.0002 6.44772 11.0002 7V11.4338L8.98566 12.6425C8.51207 12.9267 8.35851 13.5409 8.64266 14.0145C8.92681 14.4881 9.54107 14.6416 10.0146 14.3575L12.5146 12.8575C12.8159 12.6768 13.0002 12.3513 13.0002 12V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-eight', ClockEight);
