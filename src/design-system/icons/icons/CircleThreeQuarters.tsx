import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleThreeQuarters: React.FC<IconComponentProps> = ({
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
        <><path d="M12 21C16.9706 21 21 16.9706 21 12H12V3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C12.5523 2 13 2.44772 13 3V9.4C13 9.96005 13 10.2401 13.109 10.454C13.2049 10.6422 13.3578 10.7951 13.546 10.891C13.7599 11 14.0399 11 14.6 11H21C21.5523 11 22 11.4477 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-three-quarters', CircleThreeQuarters);
