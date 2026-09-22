import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PoundCircle: React.FC<IconComponentProps> = ({
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
        <><path d="M15.5 8.16666C15 7.05556 14 6.5 13 6.5C11.3431 6.5 10 7.99238 10 9.83333V12.5M10 12.5V14.2778C10 16.5 8 16.5 8 16.5H16M10 12.5H8M10 12.5H14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11 9.83333C11 8.44296 11.9919 7.5 13 7.5C13.6197 7.5 14.2549 7.83667 14.5881 8.57702C14.8147 9.08066 15.4067 9.30522 15.9104 9.07858C16.414 8.85194 16.6386 8.25993 16.4119 7.75629C15.7451 6.27444 14.3803 5.5 13 5.5C10.6944 5.5 9 7.54181 9 9.83333V11.5H8C7.44772 11.5 7 11.9477 7 12.5C7 13.0523 7.44772 13.5 8 13.5H9V14.2778C9 14.6786 8.91152 14.9122 8.83001 15.048C8.7476 15.1853 8.63835 15.2792 8.51436 15.3481C8.38458 15.4202 8.24473 15.4608 8.13041 15.482C8.07535 15.4922 8.03199 15.4968 8.00682 15.4988C7.99666 15.4996 7.98985 15.5 7.98686 15.5001C7.44063 15.5071 7 15.9521 7 16.5C7 17.0523 7.44772 17.5 8 17.5H16C16.5523 17.5 17 17.0523 17 16.5C17 15.9477 16.5523 15.5 16 15.5H10.8112C10.9345 15.1374 11 14.73 11 14.2778V13.5H14C14.5523 13.5 15 13.0523 15 12.5C15 11.9477 14.5523 11.5 14 11.5H11V9.83333Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('pound-circle', PoundCircle);
