import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CirclePercentage: React.FC<IconComponentProps> = ({
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
        <><path d="M15.5 8.5L8.5 15.5M9.5 9.5H9.51M14.5 14.5H14.51M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5ZM15 14.5C15 14.7761 14.7761 15 14.5 15C14.2239 15 14 14.7761 14 14.5C14 14.2239 14.2239 14 14.5 14C14.7761 14 15 14.2239 15 14.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM16.2071 7.79289C16.5976 8.18342 16.5976 8.81658 16.2071 9.20711L9.20711 16.2071C8.81658 16.5976 8.18342 16.5976 7.79289 16.2071C7.40237 15.8166 7.40237 15.1834 7.79289 14.7929L14.7929 7.79289C15.1834 7.40237 15.8166 7.40237 16.2071 7.79289ZM8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5ZM14.5 13C13.6716 13 13 13.6716 13 14.5C13 15.3284 13.6716 16 14.5 16C15.3284 16 16 15.3284 16 14.5C16 13.6716 15.3284 13 14.5 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-percentage', CirclePercentage);
