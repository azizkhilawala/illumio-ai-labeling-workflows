import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GaugeLow: React.FC<IconComponentProps> = ({
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
        <><path d="M11 13L8 8M16 8H16.01M12 6H12.01M18 12H18.01M6 12H6.01M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7ZM6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13ZM17 8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8ZM18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13ZM7.48566 7.14266C7.95924 6.85851 8.5735 7.01207 8.85764 7.48566L11.5836 12.0288C11.7197 12.0099 11.8588 12.0002 12.0002 12.0002C13.657 12.0002 15.0002 13.3433 15.0002 15.0002C15.0002 16.657 13.657 18.0002 12.0002 18.0002C10.3433 18.0002 9.00015 16.657 9.00015 15.0002C9.00015 14.2093 9.30617 13.4899 9.80625 12.954L7.14266 8.51465C6.85851 8.04107 7.01207 7.42681 7.48566 7.14266Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gauge-low', GaugeLow);
