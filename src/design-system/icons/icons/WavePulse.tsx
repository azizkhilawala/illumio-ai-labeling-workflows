import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WavePulse: React.FC<IconComponentProps> = ({
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
        <><path d="M3 12H7L9 19L12 5L15 17L17 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M11.9831 4.00015C12.4482 3.99226 12.8573 4.30616 12.9701 4.75747L15.2201 13.7572L16.0715 11.6286C16.2234 11.249 16.5911 11 17 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H17.677L15.9285 17.3714C15.7674 17.7741 15.365 18.0271 14.9323 17.9977C14.4995 17.9683 14.1351 17.6633 14.0299 17.2425L12.0749 9.42288L9.9778 19.2095C9.88163 19.6583 9.49231 19.984 9.0336 19.9994C8.57488 20.0149 8.16457 19.716 8.03848 19.2747L6.2457 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H7C7.44648 11 7.83887 11.296 7.96152 11.7253L8.86132 14.8746L11.0222 4.79047C11.1197 4.33561 11.5179 4.00803 11.9831 4.00015Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('wave-pulse', WavePulse);
