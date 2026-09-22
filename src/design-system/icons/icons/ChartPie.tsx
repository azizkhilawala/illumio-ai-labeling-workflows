import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartPie: React.FC<IconComponentProps> = ({
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
        <><path d="M19.9497 17.9497L15 13H22C22 14.933 21.2165 16.683 19.9497 17.9497Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20 10C20 6.13401 16.866 3 13 3V10H20Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2 12C2 16.4183 5.58172 20 10 20C12.2091 20 14.2091 19.1046 15.6569 17.6569L10 12V4C5.58172 4 2 7.58172 2 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M13 2C12.4477 2 12 2.44772 12 3V10C12 10.5523 12.4477 11 13 11H20C20.5523 11 21 10.5523 21 10C21 5.58172 17.4183 2 13 2Z" fill={color}/>
<path d="M10 3C5.02944 3 1 7.02944 1 12C1 16.9706 5.02944 21 10 21C12.485 21 14.7364 19.9915 16.364 18.364C16.7545 17.9734 16.7545 17.3403 16.364 16.9497L11.2929 11.8787C11.1054 11.6911 11 11.4368 11 11.1716V4C11 3.44772 10.5523 3 10 3Z" fill={color}/>
<path d="M15 12C14.5955 12 14.2309 12.2436 14.0761 12.6173C13.9213 12.991 14.0069 13.4211 14.2929 13.7071L19.2426 18.6569C19.6332 19.0474 20.2663 19.0474 20.6569 18.6569C22.1035 17.2102 23 15.2089 23 13C23 12.4477 22.5523 12 22 12H15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-pie', ChartPie);
