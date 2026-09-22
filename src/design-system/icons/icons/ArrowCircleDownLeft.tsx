import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowCircleDownLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M9.00018 10.5V15M9.00018 15H13.5002M9.00018 15L15.0002 8.99994M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.7071C16.0976 9.31658 16.0976 8.68341 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.2929L10 12.5858V10.5001C10 9.94777 9.55228 9.50006 9 9.50006C8.44772 9.50006 8 9.94777 8 10.5001V15.0001C8 15.5523 8.44772 16.0001 9 16.0001H13.5C14.0523 16.0001 14.5 15.5523 14.5 15.0001C14.5 14.4478 14.0523 14.0001 13.5 14.0001H11.4142L15.7071 9.7071Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-circle-down-left', ArrowCircleDownLeft);
