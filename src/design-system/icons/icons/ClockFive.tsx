import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockFive: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V12C11 12.1974 11.0584 12.3904 11.1679 12.5547L13.1679 15.5547C13.4743 16.0142 14.0952 16.1384 14.5547 15.8321C15.0142 15.5257 15.1384 14.9048 14.8321 14.4453L13 11.6972V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-five', ClockFive);
