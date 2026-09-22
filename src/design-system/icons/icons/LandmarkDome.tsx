import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LandmarkDome: React.FC<IconComponentProps> = ({
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
        <><path d="M18 10C18 6.68629 15.3137 4 12 4M6 10C6 6.68629 8.68629 4 12 4M12 4V3M3 10H21M3 21H21M3 18H6M6 18H10M6 18V13M10 18H14M10 18V13M14 18H18M14 18V13M18 18H21M18 18V13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V3.07089C16.0657 3.5094 18.4906 5.93431 18.9291 9H21C21.5523 9 22 9.44772 22 10C22 10.5523 21.5523 11 21 11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H5.07089C5.5094 5.93431 7.93431 3.5094 11 3.07089V3C11 2.44772 11.4477 2 12 2ZM6 12C6.55228 12 7 12.4477 7 13V17H9V13C9 12.4477 9.44772 12 10 12C10.5523 12 11 12.4477 11 13V17H13V13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13V17H17V13C17 12.4477 17.4477 12 18 12C18.5523 12 19 12.4477 19 13V17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18C2 17.4477 2.44772 17 3 17H5V13C5 12.4477 5.44772 12 6 12ZM2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('landmark-dome', LandmarkDome);
