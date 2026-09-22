import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M3 5.5L5 3.5M21 5.5L19 3.5M9 12.5L11 14.5L15 10.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4.29289 2.79289C4.68342 2.40237 5.31658 2.40237 5.70711 2.79289C6.09763 3.18342 6.09763 3.81658 5.70711 4.20711L3.70711 6.20711C3.31658 6.59763 2.68342 6.59763 2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289L4.29289 2.79289Z" fill={color}/>
<path d="M18.2929 2.79289C18.6834 2.40237 19.3166 2.40237 19.7071 2.79289L21.7071 4.79289C22.0976 5.18342 22.0976 5.81658 21.7071 6.20711C21.3166 6.59763 20.6834 6.59763 20.2929 6.20711L18.2929 4.20711C17.9024 3.81658 17.9024 3.18342 18.2929 2.79289Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M3 12.5C3 7.52944 7.02944 3.5 12 3.5C16.9706 3.5 21 7.52944 21 12.5C21 17.4706 16.9706 21.5 12 21.5C7.02944 21.5 3 17.4706 3 12.5ZM15.7071 11.2071C16.0976 10.8166 16.0976 10.1834 15.7071 9.79289C15.3166 9.40237 14.6834 9.40237 14.2929 9.79289L11 13.0858L9.70711 11.7929C9.31658 11.4024 8.68342 11.4024 8.29289 11.7929C7.90237 12.1834 7.90237 12.8166 8.29289 13.2071L10.2929 15.2071C10.6834 15.5976 11.3166 15.5976 11.7071 15.2071L15.7071 11.2071Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-check', ClockCheck);
