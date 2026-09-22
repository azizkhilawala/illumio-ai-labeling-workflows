import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowCircleUpLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M9.00019 13.5001V9.00005M9.00019 9.00005H13.5002M9.00019 9.00005L15.0002 14.9999M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 8C8.44772 8 8 8.44772 8 9V13.5C8 14.0523 8.44772 14.5 9 14.5C9.55228 14.5 10 14.0523 10 13.5V11.4142L14.2929 15.707C14.6834 16.0975 15.3166 16.0975 15.7071 15.707C16.0976 15.3165 16.0976 14.6833 15.7071 14.2928L11.4142 10H13.5C14.0523 10 14.5 9.55228 14.5 9C14.5 8.44772 14.0523 8 13.5 8H9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-circle-up-left', ArrowCircleUpLeft);
