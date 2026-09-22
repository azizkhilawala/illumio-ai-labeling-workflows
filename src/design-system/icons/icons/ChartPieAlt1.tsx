import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartPieAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M21 12C21 7.02944 16.9706 3 12 3M21 12H12M12 3V12M12 12L16.9948 19.4879" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2.04938C5.94668 2.5511 2 6.81465 2 12C2 17.5229 6.47715 22 12 22C13.6942 22 15.2899 21.5787 16.6883 20.8352L11.1679 12.5547C11.0584 12.3904 11 12.1974 11 12V2.04938Z" fill={color}/>
<path d="M18.3514 19.7243C20.3377 18.0892 21.6823 15.7029 21.9506 13H13.8685L18.3514 19.7243Z" fill={color}/>
<path d="M21.9506 11C21.4816 6.27559 17.7244 2.51845 13 2.04938V11H21.9506Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-pie-alt-1', ChartPieAlt1);
