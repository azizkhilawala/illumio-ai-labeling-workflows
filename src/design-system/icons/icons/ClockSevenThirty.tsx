import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockSevenThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM13.0002 12.0001C13.0002 11.5506 12.7003 11.1564 12.2671 11.0364C11.8339 10.9164 11.3739 11.1002 11.1427 11.4856L9.64266 13.9856C9.35851 14.4592 9.51207 15.0734 9.98566 15.3576C10.3081 15.5511 10.6959 15.5416 11.0002 15.3663V17.0001C11.0002 17.5524 11.4479 18.0001 12.0002 18.0001C12.5524 18.0001 13.0002 17.5524 13.0002 17.0001V12.0001Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-seven-thirty', ClockSevenThirty);
