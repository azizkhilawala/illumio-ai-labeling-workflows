import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowCircleBrokenLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M21.9506 11H11.4142L13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L8.29289 11.2929C7.90237 11.6834 7.90237 12.3166 8.29289 12.7071L12.2929 16.7071C12.6834 17.0976 13.3166 17.0976 13.7071 16.7071C14.0976 16.3166 14.0976 15.6834 13.7071 15.2929L11.4142 13H21.9506C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.1853 2 21.4489 5.94668 21.9506 11Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-circle-broken-left', ArrowNarrowCircleBrokenLeft);
