import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LocationCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M9 11L11 13L15 9M19 10.2C19 14.1764 15.5 17.4 12 21C8.5 17.4 5 14.1764 5 10.2C5 6.22355 8.13401 3 12 3C15.866 3 19 6.22355 19 10.2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4 10.2C4 5.69801 7.55535 2 12 2C16.4446 2 20 5.69801 20 10.2C20 12.4965 18.9859 14.5068 17.613 16.3405C16.4671 17.871 15.0003 19.3666 13.5411 20.8543C13.2654 21.1355 12.99 21.4163 12.717 21.6971C12.5287 21.8907 12.2701 22 12 22C11.7299 22 11.4713 21.8907 11.283 21.6971C11.01 21.4163 10.7346 21.1355 10.4589 20.8543C8.99974 19.3666 7.53292 17.871 6.38702 16.3405C5.01406 14.5068 4 12.4965 4 10.2ZM15.7071 9.70711C16.0976 9.31658 16.0976 8.68342 15.7071 8.29289C15.3166 7.90237 14.6834 7.90237 14.2929 8.29289L11 11.5858L9.70711 10.2929C9.31658 9.90237 8.68342 9.90237 8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071L10.2929 13.7071C10.6834 14.0976 11.3166 14.0976 11.7071 13.7071L15.7071 9.70711Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('location-check', LocationCheck);
