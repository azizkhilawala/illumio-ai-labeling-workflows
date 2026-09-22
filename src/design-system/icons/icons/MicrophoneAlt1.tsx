import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MicrophoneAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V22M8 22H16M12 15C10.3431 15 9 13.6569 9 12V5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5V12C15 13.6569 13.6569 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12V5ZM5 9C5.55228 9 6 9.44772 6 10V12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12V10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10V12C20 16.0796 16.9463 19.446 13 19.9381V21H16C16.5523 21 17 21.4477 17 22C17 22.5523 16.5523 23 16 23H8C7.44772 23 7 22.5523 7 22C7 21.4477 7.44772 21 8 21H11V19.9381C7.05369 19.446 4 16.0796 4 12V10C4 9.44772 4.44772 9 5 9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('microphone-alt-1', MicrophoneAlt1);
