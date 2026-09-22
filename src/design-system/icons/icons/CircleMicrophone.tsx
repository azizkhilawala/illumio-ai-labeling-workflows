import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleMicrophone: React.FC<IconComponentProps> = ({
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
        <><path d="M17 11V13C17 15.7614 14.7614 18 12 18C9.23858 18 7 15.7614 7 13V11M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM12 15C10.8954 15 10 14.1046 10 13V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V13C14 14.1046 13.1046 15 12 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM7 10C7.55228 10 8 10.4477 8 11V13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13V11C16 10.4477 16.4477 10 17 10C17.5523 10 18 10.4477 18 11V13C18 16.3137 15.3137 19 12 19C8.68629 19 6 16.3137 6 13V11C6 10.4477 6.44772 10 7 10ZM12 5C10.8954 5 10 5.89543 10 7V13C10 14.1046 10.8954 15 12 15C13.1046 15 14 14.1046 14 13V7C14 5.89543 13.1046 5 12 5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-microphone', CircleMicrophone);
