import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const EyeAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 6C7.58172 6 4 9.58172 4 14C4 14.5523 3.55228 15 3 15C2.44772 15 2 14.5523 2 14C2 8.47715 6.47715 4 12 4C17.5228 4 22 8.47715 22 14C22 14.5523 21.5523 15 21 15C20.4477 15 20 14.5523 20 14C20 9.58172 16.4183 6 12 6Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M6 14C6 10.6863 8.68629 8 12 8C15.3137 8 18 10.6863 18 14C18 17.3137 15.3137 20 12 20C8.68629 20 6 17.3137 6 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('eye-alt', EyeAlt);
