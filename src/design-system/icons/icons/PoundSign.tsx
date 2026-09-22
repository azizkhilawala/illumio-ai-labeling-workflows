import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PoundSign: React.FC<IconComponentProps> = ({
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
        <><path d="M5 20H19M5 13H15M18 6.81794C17.1896 5.14985 15.4791 4 13.5 4C10.7386 4 8.5 6.23858 8.5 9V17C8.5 18.6569 7.15685 20 5.5 20" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M13.5 5C11.2909 5 9.5 6.79086 9.5 9V12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H9.5V17C9.5 17.7286 9.30521 18.4117 8.96487 19H19C19.5523 19 20 19.4477 20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20C4 19.4477 4.44772 19 5 19H5.5C6.60457 19 7.5 18.1046 7.5 17V14H5C4.44772 14 4 13.5523 4 13C4 12.4477 4.44772 12 5 12H7.5V9C7.5 5.68629 10.1863 3 13.5 3C15.8764 3 17.9282 4.38164 18.8995 6.38097C19.1408 6.87774 18.9337 7.47608 18.437 7.71741C17.9402 7.95875 17.3419 7.75167 17.1005 7.25491C16.4511 5.91806 15.0818 5 13.5 5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pound-sign', PoundSign);
