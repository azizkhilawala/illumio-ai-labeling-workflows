import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DiscAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M6.5 12C6.5 15.0376 8.96243 17.5 12 17.5M17.5 12C17.5 8.96243 15.0376 6.5 12 6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM11 6C11 5.44772 11.4477 5 12 5C15.866 5 19 8.13401 19 12C19 12.5523 18.5523 13 18 13C17.4477 13 17 12.5523 17 12C17 9.23858 14.7614 7 12 7C11.4477 7 11 6.55228 11 6ZM6 11C6.55228 11 7 11.4477 7 12C7 14.7614 9.23858 17 12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C8.13401 19 5 15.866 5 12C5 11.4477 5.44772 11 6 11ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('disc-alt', DiscAlt);
