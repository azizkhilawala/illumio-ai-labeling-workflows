import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleWaveformLines: React.FC<IconComponentProps> = ({
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
        <><path d="M7.5 11V13M13.5 8V16M10.5 10V14M16.5 10.5V13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM14.5 8C14.5 7.44772 14.0523 7 13.5 7C12.9477 7 12.5 7.44772 12.5 8V16C12.5 16.5523 12.9477 17 13.5 17C14.0523 17 14.5 16.5523 14.5 16V8ZM11.5 10C11.5 9.44772 11.0523 9 10.5 9C9.94772 9 9.5 9.44772 9.5 10V14C9.5 14.5523 9.94772 15 10.5 15C11.0523 15 11.5 14.5523 11.5 14V10ZM17.5 10.5C17.5 9.94772 17.0523 9.5 16.5 9.5C15.9477 9.5 15.5 9.94772 15.5 10.5V13.5C15.5 14.0523 15.9477 14.5 16.5 14.5C17.0523 14.5 17.5 14.0523 17.5 13.5V10.5ZM8.5 11C8.5 10.4477 8.05228 10 7.5 10C6.94772 10 6.5 10.4477 6.5 11V13C6.5 13.5523 6.94772 14 7.5 14C8.05228 14 8.5 13.5523 8.5 13V11Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-waveform-lines', CircleWaveformLines);
