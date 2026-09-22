import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockLines: React.FC<IconComponentProps> = ({
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
        <><path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M10 3C10 2.44772 10.4477 2 11 2H15C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H13H11C10.4477 4 10 3.55228 10 3Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 4C17.9706 4 22 8.02944 22 13C22 17.9706 17.9706 22 13 22C10.8567 22 8.88839 21.2508 7.34267 20H10C11.1046 20 12 19.1046 12 18C12 16.8954 11.1046 16 10 16H9.73244C9.90261 15.7058 10 15.3643 10 15C10 13.8954 9.10457 13 8 13H4C4 8.02944 8.02944 4 13 4ZM13 8C12.4477 8 12 8.44772 12 9V13C12 13.5523 12.4477 14 13 14C13.5523 14 14 13.5523 14 13V9C14 8.44772 13.5523 8 13 8Z" fill={color}/>
<path d="M3 14C2.44772 14 2 14.4477 2 15C2 15.5523 2.44772 16 3 16H8C8.55228 16 9 15.5523 9 15C9 14.4477 8.55229 14 8 14H3Z" fill={color}/>
<path d="M5 17C4.44772 17 4 17.4477 4 18C4 18.5523 4.44772 19 5 19H10C10.5523 19 11 18.5523 11 18C11 17.4477 10.5523 17 10 17H5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-lines', ClockLines);
