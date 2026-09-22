import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudWired: React.FC<IconComponentProps> = ({
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
        <><path d="M15 18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18M15 18C15 16.3431 13.6569 15 12 15M15 18H21M9 18C9 16.3431 10.3431 15 12 15M9 18H3M12 15V12M9.6 12C7.61177 12 6 10.46 6 8.56026C6 6.98576 7.2 5.53125 9 5.25C9.56463 3.95553 10.9009 3 12.4595 3C14.456 3 16.0878 4.49304 16.2 6.375C17.2595 6.82171 18 7.91806 18 9.10513C18 10.7039 16.6569 12 15 12L9.6 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.4595 2C10.6847 2 9.14004 2.9769 8.32611 4.37228C6.3454 4.90758 5 6.63195 5 8.56026C5 11.0547 7.10289 13 9.6 13L11 13V14.126C9.59439 14.4878 8.4878 15.5944 8.12602 17H3C2.44772 17 2 17.4477 2 18C2 18.5523 2.44772 19 3 19H8.12602C8.57006 20.7252 10.1362 22 12 22C13.8638 22 15.4299 20.7252 15.874 19H21C21.5523 19 22 18.5523 22 18C22 17.4477 21.5523 17 21 17H15.874C15.5122 15.5944 14.4056 14.4878 13 14.126V13L15 13C17.1752 13 19 11.2895 19 9.10513C19 7.72329 18.2581 6.43997 17.1249 5.73213C16.7085 3.57888 14.7472 2 12.4595 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-wired', CloudWired);
