import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MonitorMedical: React.FC<IconComponentProps> = ({
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
        <><path d="M12 17V21M8 21H16M10 10H14M12 8V12M6.2 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V13.8C3 14.9201 3 15.4802 3.21799 15.908C3.40973 16.2843 3.71569 16.5903 4.09202 16.782C4.51984 17 5.07989 17 6.2 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V8H10C9.44772 8 9 8.44772 9 9C9 9.55228 9.44772 10 10 10H11V11C11 11.5523 11.4477 12 12 12C12.5523 12 13 11.5523 13 11V10H14C14.5523 10 15 9.55228 15 9C15 8.44772 14.5523 8 14 8H13V7Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M5 2C3.34315 2 2 3.34315 2 5V15C2 16.6569 3.34315 18 5 18H11V20H8C7.44772 20 7 20.4477 7 21C7 21.5523 7.44772 22 8 22H16C16.5523 22 17 21.5523 17 21C17 20.4477 16.5523 20 16 20H13V18H19C20.6569 18 22 16.6569 22 15V5C22 3.34315 20.6569 2 19 2H5ZM5 4C4.44772 4 4 4.44772 4 5V14H20V5C20 4.44772 19.5523 4 19 4H5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('monitor-medical', MonitorMedical);
