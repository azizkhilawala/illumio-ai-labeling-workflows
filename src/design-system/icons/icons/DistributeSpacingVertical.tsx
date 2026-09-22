import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DistributeSpacingVertical: React.FC<IconComponentProps> = ({
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
        <><path d="M3 4H21M3 20H21M7.6 15H16.4C16.9601 15 17.2401 15 17.454 14.891C17.6422 14.7951 17.7951 14.6422 17.891 14.454C18 14.2401 18 13.9601 18 13.4V10.6C18 10.0399 18 9.75992 17.891 9.54601C17.7951 9.35785 17.6422 9.20487 17.454 9.10899C17.2401 9 16.9601 9 16.4 9H7.6C7.03995 9 6.75992 9 6.54601 9.10899C6.35785 9.20487 6.20487 9.35785 6.10899 9.54601C6 9.75992 6 10.0399 6 10.6V13.4C6 13.9601 6 14.2401 6.10899 14.454C6.20487 14.6422 6.35785 14.7951 6.54601 14.891C6.75992 15 7.03995 15 7.6 15Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H21C21.5523 5 22 4.55228 22 4C22 3.44772 21.5523 3 21 3H3Z" fill={color}/>
<path d="M3 19C2.44772 19 2 19.4477 2 20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20C22 19.4477 21.5523 19 21 19H3Z" fill={color}/>
<path d="M5.21799 9.09202C5 9.51984 5 10.0799 5 11.2V12.8C5 13.9201 5 14.4802 5.21799 14.908C5.40973 15.2843 5.71569 15.5903 6.09202 15.782C6.51984 16 7.0799 16 8.2 16H15.8C16.9201 16 17.4802 16 17.908 15.782C18.2843 15.5903 18.5903 15.2843 18.782 14.908C19 14.4802 19 13.9201 19 12.8V11.2C19 10.0799 19 9.51984 18.782 9.09202C18.5903 8.71569 18.2843 8.40973 17.908 8.21799C17.4802 8 16.9201 8 15.8 8H8.2C7.0799 8 6.51984 8 6.09202 8.21799C5.71569 8.40973 5.40973 8.71569 5.21799 9.09202Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('distribute-spacing-vertical', DistributeSpacingVertical);
