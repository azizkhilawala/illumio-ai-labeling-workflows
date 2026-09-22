import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LocationPinAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 2C7.55535 2 4 5.69801 4 10.2C4 12.4965 5.01406 14.5068 6.38702 16.3405C7.53292 17.871 8.99974 19.3666 10.4589 20.8543C10.7346 21.1355 11.01 21.4163 11.283 21.6971C11.4713 21.8907 11.7299 22 12 22C12.2701 22 12.5287 21.8907 12.717 21.6971C12.99 21.4163 13.2654 21.1355 13.5411 20.8543C15.0003 19.3666 16.4671 17.871 17.613 16.3405C18.9859 14.5068 20 12.4965 20 10.2C20 5.69801 16.4446 2 12 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('location-pin-alt', LocationPinAlt);
