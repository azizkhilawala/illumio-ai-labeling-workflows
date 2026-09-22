import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockElevenThirty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V12L10.5 9.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.3576 8.98541C11.0735 8.51183 10.4592 8.35827 9.98566 8.64241C9.51207 8.92656 9.35851 9.54082 9.64266 10.0144L11.0002 12.2769V16.9999C11.0002 17.5522 11.4479 17.9999 12.0002 17.9999C12.5524 17.9999 13.0002 17.5522 13.0002 16.9999V11.9999C13.0002 11.8187 12.9509 11.6408 12.8576 11.4854L11.3576 8.98541Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-eleven-thirty', ClockElevenThirty);
