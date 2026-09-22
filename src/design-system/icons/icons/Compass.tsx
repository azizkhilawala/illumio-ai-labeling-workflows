import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Compass: React.FC<IconComponentProps> = ({
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
        <><path d="M12 12H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM16 8L9.5 9.5L8 16L14.5 14.5L16 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.9744 8.22488C17.0519 7.88892 16.9509 7.53672 16.7071 7.29291C16.4633 7.04911 16.1111 6.9481 15.7752 7.02563L9.27516 8.52563C8.90256 8.61161 8.61161 8.90256 8.52563 9.27516L7.02563 15.7752C6.9481 16.1111 7.04911 16.4633 7.29291 16.7071C7.53672 16.9509 7.88892 17.0519 8.22488 16.9744L14.7249 15.4744C15.0975 15.3884 15.3884 15.0975 15.4744 14.7249L16.9744 8.22488Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('compass', Compass);
