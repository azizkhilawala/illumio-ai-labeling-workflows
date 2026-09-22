import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartPieAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12H12M12 3V12M12 12L5.62446 18.3524" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2.04938C5.94668 2.5511 2 6.81465 2 12C2 14.4013 2.84637 16.6049 4.25705 18.3287L11 11.5858V2.04938Z" fill={color}/>
<path d="M5.67127 19.7429C7.39514 21.1536 9.59873 22 12 22C17.1853 22 21.4489 18.0533 21.9506 13H12.4142L5.67127 19.7429Z" fill={color}/>
<path d="M21.9506 11C21.4816 6.27559 17.7244 2.51845 13 2.04938V11H21.9506Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-pie-alt', ChartPieAlt);
