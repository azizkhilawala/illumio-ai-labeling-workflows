import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ToiletsPortable: React.FC<IconComponentProps> = ({
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
        <><path d="M4 19V6.6C4 6.03995 4 5.75992 4.10899 5.54601C4.20487 5.35785 4.35785 5.20487 4.54601 5.10899C4.75992 5 5.03995 5 5.6 5H8.4C8.96005 5 9.24008 5 9.45399 5.10899C9.64215 5.20487 9.79513 5.35785 9.89101 5.54601C10 5.75992 10 6.03995 10 6.6V19M14 19V6.6C14 6.03995 14 5.75992 14.109 5.54601C14.2049 5.35785 14.3578 5.20487 14.546 5.10899C14.7599 5 15.0399 5 15.6 5H18.4C18.9601 5 19.2401 5 19.454 5.10899C19.6422 5.20487 19.7951 5.35785 19.891 5.54601C20 5.75992 20 6.03995 20 6.6V19M4 9H10M14 9H20M4 17H10M14 17H20M9 13H9.01M19 13H19.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V8H11V7.2C11 6.0799 11 5.51984 10.782 5.09202C10.5903 4.71569 10.2843 4.40973 9.90798 4.21799C9.48016 4 8.9201 4 7.8 4H6.2C5.0799 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M3 19V10H11V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V18H5V19C5 19.5523 4.55228 20 4 20C3.44772 20 3 19.5523 3 19ZM10 13C10 13.5523 9.55229 14 9 14C8.44772 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12C9.55229 12 10 12.4477 10 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M13 10V19C13 19.5523 13.4477 20 14 20C14.5523 20 15 19.5523 15 19V18H19V19C19 19.5523 19.4477 20 20 20C20.5523 20 21 19.5523 21 19V10H13ZM20 13C20 13.5523 19.5523 14 19 14C18.4477 14 18 13.5523 18 13C18 12.4477 18.4477 12 19 12C19.5523 12 20 12.4477 20 13Z" fill={color}/>
<path d="M21 7.2V8H13V7.2C13 6.0799 13 5.51984 13.218 5.09202C13.4097 4.71569 13.7157 4.40973 14.092 4.21799C14.5198 4 15.0799 4 16.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('toilets-portable', ToiletsPortable);
