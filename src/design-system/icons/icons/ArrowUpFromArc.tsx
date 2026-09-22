import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowUpFromArc: React.FC<IconComponentProps> = ({
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
        <><path d="M3 11V12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12V11M8 7L12 3M12 3L16 7M12 3V15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.7071 2.29289C12.3166 1.90237 11.6834 1.90237 11.2929 2.29289L7.29289 6.29289C6.90237 6.68342 6.90237 7.31658 7.29289 7.70711C7.68342 8.09763 8.31658 8.09763 8.70711 7.70711L11 5.41421V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V5.41421L15.2929 7.70711C15.6834 8.09763 16.3166 8.09763 16.7071 7.70711C17.0976 7.31658 17.0976 6.68342 16.7071 6.29289L12.7071 2.29289Z" fill={color}/>
<path d="M3 10H9V15C9 16.6569 10.3431 18 12 18C13.6569 18 15 16.6569 15 15V10H21C21.5523 10 22 10.4477 22 11V12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12V11C2 10.4477 2.44772 10 3 10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-up-from-arc', ArrowUpFromArc);
