import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HeadphonesAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M3 17V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V17M8.28571 21C7.02335 21 6 19.9767 6 18.7143V15.2857C6 14.0233 7.02335 13 8.28571 13C9.23249 13 10 13.7675 10 14.7143V19.2857C10 20.2325 9.23249 21 8.28571 21ZM15.7143 21C16.9767 21 18 19.9767 18 18.7143V15.2857C18 14.0233 16.9767 13 15.7143 13C14.7675 13 14 13.7675 14 14.7143V19.2857C14 20.2325 14.7675 21 15.7143 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V16C20 16.5523 20.4477 17 21 17C21.5523 17 22 16.5523 22 16V12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12V17C2 17.5523 2.44772 18 3 18C3.55228 18 4 17.5523 4 17V12Z" fill={color}/>
<path d="M5 15.4286C5 13.535 6.53502 12 8.42857 12C9.84873 12 11 13.1513 11 14.5714V19.4286C11 20.8487 9.84873 22 8.42857 22C6.53502 22 5 20.465 5 18.5714V15.4286Z" fill={color}/>
<path d="M19 15.4286C19 13.535 17.465 12 15.5714 12C14.1513 12 13 13.1513 13 14.5714V19.4286C13 20.8487 14.1513 22 15.5714 22C17.465 22 19 20.465 19 18.5714V15.4286Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('headphones-alt-1', HeadphonesAlt1);
