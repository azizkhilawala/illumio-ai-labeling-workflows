import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CornerDownLeft: React.FC<IconComponentProps> = ({
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
        <><path d="M20 4V6.4C20 9.76032 20 11.4405 19.346 12.7239C18.7708 13.8529 17.8529 14.7708 16.7239 15.346C15.4405 16 13.7603 16 10.4 16H4M4 16L8 12M4 16L8 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M20 3C20.5523 3 21 3.44772 21 4V6.44444C21 8.08697 21 9.38091 20.9149 10.4222C20.8281 11.4846 20.6478 12.3717 20.237 13.1779C19.5659 14.4951 18.4951 15.5659 17.1779 16.237C16.3717 16.6478 15.4846 16.8281 14.4222 16.9149C13.3809 17 12.0869 17 10.4444 17H6.41421L8.70711 19.2929C9.09763 19.6834 9.09763 20.3166 8.70711 20.7071C8.31658 21.0976 7.68342 21.0976 7.29289 20.7071L3.29289 16.7071C2.90237 16.3166 2.90237 15.6834 3.29289 15.2929L7.29289 11.2929C7.68342 10.9024 8.31658 10.9024 8.70711 11.2929C9.09763 11.6834 9.09763 12.3166 8.70711 12.7071L6.41421 15H10.4C12.0967 15 13.309 14.9992 14.2594 14.9216C15.198 14.8449 15.7927 14.6982 16.27 14.455C17.2108 13.9757 17.9757 13.2108 18.455 12.27C18.6982 11.7927 18.8449 11.198 18.9216 10.2594C18.9992 9.30901 19 8.09666 19 6.4V4C19 3.44772 19.4477 3 20 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('corner-down-left', CornerDownLeft);
