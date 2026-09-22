import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartPieSimple: React.FC<IconComponentProps> = ({
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
        <><path d="M21 10C21 6.13401 17.866 3 14 3V10H21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11 21C15.4183 21 19 17.4183 19 13H11V5C6.58172 5 3 8.58172 3 13C3 17.4183 6.58172 21 11 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M14 2C13.4477 2 13 2.44772 13 3V10C13 10.5523 13.4477 11 14 11H21C21.5523 11 22 10.5523 22 10C22 5.58172 18.4183 2 14 2Z" fill={color}/>
<path d="M11 4C6.02944 4 2 8.02944 2 13C2 17.9706 6.02944 22 11 22C15.9706 22 20 17.9706 20 13C20 12.4477 19.5523 12 19 12H13C12.4477 12 12 11.5523 12 11V5C12 4.44772 11.5523 4 11 4Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-pie-simple', ChartPieSimple);
