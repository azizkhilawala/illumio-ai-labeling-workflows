import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LocationPinAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.55535 2 4 5.69801 4 10.2C4 12.4965 5.01406 14.5068 6.38702 16.3405C7.53292 17.871 8.99974 19.3666 10.4589 20.8543C10.7346 21.1355 11.01 21.4163 11.283 21.6971C11.4713 21.8907 11.7299 22 12 22C12.2701 22 12.5287 21.8907 12.717 21.6971C12.99 21.4163 13.2654 21.1355 13.5411 20.8543C15.0003 19.3666 16.4671 17.871 17.613 16.3405C18.9859 14.5068 20 12.4965 20 10.2C20 5.69801 16.4446 2 12 2ZM18 10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10Z" fill={color}/>
<path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('location-pin-alt-1', LocationPinAlt1);
