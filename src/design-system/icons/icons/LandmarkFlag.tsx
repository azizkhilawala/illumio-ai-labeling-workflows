import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LandmarkFlag: React.FC<IconComponentProps> = ({
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
        <><path d="M3 21H21M3 11H21M3 18H21M6 18V14M10 18V14M14 18V14M18 18V14M12 7H16.84C16.896 7 16.924 7 16.9454 6.9891C16.9642 6.97951 16.9795 6.96422 16.9891 6.9454C17 6.92401 17 6.89601 17 6.84V4.16C17 4.10399 17 4.07599 16.9891 4.0546C16.9795 4.03578 16.9642 4.02049 16.9454 4.0109C16.924 4 16.896 4 16.84 4H12M12 11V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V10H3C2.44772 10 2 10.4477 2 11C2 11.5523 2.44772 12 3 12H21C21.5523 12 22 11.5523 22 11C22 10.4477 21.5523 10 21 10H13V8L16.8439 8.00001C16.8627 8.00009 16.9257 8.00033 16.9871 7.99532C17.0656 7.9889 17.2242 7.96936 17.3994 7.88011C17.6064 7.77464 17.7747 7.60636 17.8801 7.39939C17.9694 7.22423 17.9889 7.06563 17.9953 6.98711C18.0003 6.92577 18.0001 6.86281 18 6.84397V4.15608C18.0001 4.13724 18.0003 4.07423 17.9953 4.01289C17.9889 3.93437 17.9694 3.77577 17.8801 3.60061C17.7747 3.39364 17.6064 3.22536 17.3994 3.11989C17.2242 3.03064 17.0656 3.0111 16.9871 3.00468C16.9257 2.99967 16.8627 2.99991 16.8439 2.99999L13 3Z" fill={color}/>
<path d="M19 14H17V16H15V14H13V16H11V14H9V16H7V14H5V16H3C2.44772 16 2 16.4477 2 17C2 17.5523 2.44772 18 3 18H21C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16H19V14Z" fill={color}/>
<path d="M3 20C2.44772 20 2 20.4477 2 21C2 21.5523 2.44772 22 3 22H21C21.5523 22 22 21.5523 22 21C22 20.4477 21.5523 20 21 20H3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('landmark-flag', LandmarkFlag);
