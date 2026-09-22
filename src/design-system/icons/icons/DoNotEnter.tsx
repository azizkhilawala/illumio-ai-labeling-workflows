import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DoNotEnter: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7 11.6C7 11.0399 7 10.7599 7.10899 10.546C7.20487 10.3578 7.35785 10.2049 7.54601 10.109C7.75992 10 8.03995 10 8.6 10H15.4C15.9601 10 16.2401 10 16.454 10.109C16.6422 10.2049 16.7951 10.3578 16.891 10.546C17 10.7599 17 11.0399 17 11.6V12.4C17 12.9601 17 13.2401 16.891 13.454C16.7951 13.6422 16.6422 13.7951 16.454 13.891C16.2401 14 15.9601 14 15.4 14H8.6C8.03995 14 7.75992 14 7.54601 13.891C7.35785 13.7951 7.20487 13.6422 7.10899 13.454C7 13.2401 7 12.9601 7 12.4V11.6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM6.5 10.5C6.22386 10.5 6 10.7239 6 11V13C6 13.2761 6.22386 13.5 6.5 13.5H17.5C17.7761 13.5 18 13.2761 18 13V11C18 10.7239 17.7761 10.5 17.5 10.5H6.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('do-not-enter', DoNotEnter);
