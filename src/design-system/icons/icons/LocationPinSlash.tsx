import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LocationPinSlash: React.FC<IconComponentProps> = ({
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
        <><path d="M9.19739 3.60027C10.0555 3.2142 11.0034 3 12 3C15.866 3 19 6.22355 19 10.2C19 11.1279 18.8094 12.0148 18.4727 12.875M16.3439 16.3431C15.0983 17.887 13.5491 19.4066 12 21C8.5 17.4 5 14.1764 5 10.2C5 8.71437 5.43745 7.33384 6.18709 6.18723M3 3L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M15 10C15 10.2421 14.9713 10.4775 14.9172 10.703L18.777 14.5628C19.5215 13.2199 20 11.7775 20 10.2C20 5.69801 16.4446 2 12 2C10.3605 2 8.84207 2.50315 7.5784 3.3642L11.297 7.08282C11.5225 7.02868 11.7579 7 12 7C13.6569 7 15 8.34315 15 10Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.93577 6.34998C4.33797 7.50035 4 8.81196 4 10.2C4 12.4965 5.01406 14.5068 6.38702 16.3405C7.53292 17.871 8.99974 19.3666 10.4589 20.8543C10.7346 21.1355 11.01 21.4163 11.283 21.6971C11.4713 21.8907 11.7299 22 12 22C12.2701 22 12.5287 21.8907 12.717 21.6971C12.99 21.4163 13.2654 21.1355 13.5411 20.8543C14.5266 19.8496 15.5155 18.8412 16.4067 17.821L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L4.93577 6.34998ZM11.5527 12.9669L9.03313 10.4473C9.22729 11.7461 10.2539 12.7727 11.5527 12.9669Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('location-pin-slash', LocationPinSlash);
