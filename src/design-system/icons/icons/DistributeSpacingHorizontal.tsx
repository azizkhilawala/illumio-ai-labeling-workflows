import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DistributeSpacingHorizontal: React.FC<IconComponentProps> = ({
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
        <><path d="M4 3V21M20 3V21M10.6 18H13.4C13.9601 18 14.2401 18 14.454 17.891C14.6422 17.7951 14.7951 17.6422 14.891 17.454C15 17.2401 15 16.9601 15 16.4V7.6C15 7.03995 15 6.75992 14.891 6.54601C14.7951 6.35785 14.6422 6.20487 14.454 6.10899C14.2401 6 13.9601 6 13.4 6H10.6C10.0399 6 9.75992 6 9.54601 6.10899C9.35785 6.20487 9.20487 6.35785 9.10899 6.54601C9 6.75992 9 7.03995 9 7.6V16.4C9 16.9601 9 17.2401 9.10899 17.454C9.20487 17.6422 9.35785 17.7951 9.54601 17.891C9.75992 18 10.0399 18 10.6 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M5 3C5 2.44772 4.55228 2 4 2C3.44772 2 3 2.44772 3 3V21C3 21.5523 3.44772 22 4 22C4.55228 22 5 21.5523 5 21V3Z" fill={color}/>
<path d="M21 3C21 2.44772 20.5523 2 20 2C19.4477 2 19 2.44772 19 3V21C19 21.5523 19.4477 22 20 22C20.5523 22 21 21.5523 21 21V3Z" fill={color}/>
<path d="M8.21799 6.09202C8 6.51984 8 7.0799 8 8.2V15.8C8 16.9201 8 17.4802 8.21799 17.908C8.40973 18.2843 8.71569 18.5903 9.09202 18.782C9.51984 19 10.0799 19 11.2 19H12.8C13.9201 19 14.4802 19 14.908 18.782C15.2843 18.5903 15.5903 18.2843 15.782 17.908C16 17.4802 16 16.9201 16 15.8V8.2C16 7.0799 16 6.51984 15.782 6.09202C15.5903 5.71569 15.2843 5.40973 14.908 5.21799C14.4802 5 13.9201 5 12.8 5H11.2C10.0799 5 9.51984 5 9.09202 5.21799C8.71569 5.40973 8.40973 5.71569 8.21799 6.09202Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('distribute-spacing-horizontal', DistributeSpacingHorizontal);
