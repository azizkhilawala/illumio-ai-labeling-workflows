import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowCircleDownRight: React.FC<IconComponentProps> = ({
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
        <><path d="M15 10.5V15M15 15H10.5M15 15L9.00019 8.99994M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9.70712 8.29291C9.31661 7.90238 8.68344 7.90236 8.29291 8.29288C7.90238 8.68339 7.90236 9.31656 8.29288 9.70709L12.5857 14.0001H10.4998C9.94753 14.0001 9.49981 14.4478 9.49981 15.0001C9.49981 15.5523 9.94753 16.0001 10.4998 16.0001H14.9998C15.5521 16.0001 15.9998 15.5523 15.9998 15.0001V10.5001C15.9998 9.94777 15.5521 9.50006 14.9998 9.50006C14.4475 9.50006 13.9998 9.94777 13.9998 10.5001V12.5858L9.70712 8.29291Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-circle-down-right', ArrowCircleDownRight);
