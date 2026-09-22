import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudSlash: React.FC<IconComponentProps> = ({
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
        <><path d="M18.5221 18.5208C17.9141 18.8274 17.2272 19 16.5 19L8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C7.59659 8.27034 7.70825 8.04754 7.83373 7.83303M10.9021 5.30015C11.4635 5.10615 12.0645 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 14.7799 20.9739 15.0568 20.924 15.3253M3 3L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L6.34079 7.75501C3.71245 8.61411 2 11.0295 2 13.6493C2 17.1653 4.87404 20 8.4 20L16.5 20C17.1261 20 17.7277 19.8953 18.2883 19.7026L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289Z" fill={color}/>
<path d="M22 14.4969C22 15.4471 21.7592 16.3412 21.3354 17.1214L9.21945 5.00543C10.2254 4.37293 11.4125 4 12.6893 4C16.0089 4 18.7677 6.42894 19.2384 9.60789C20.9071 10.5857 22 12.4783 22 14.4969Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-slash', CloudSlash);
