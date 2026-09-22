import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockPlus: React.FC<IconComponentProps> = ({
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
        <><path d="M12 16.5V8.5M16 12.5L8 12.5008M3 5.5L5 3.5M21 5.5L19 3.5M20 12.5C20 16.9183 16.4183 20.5 12 20.5C7.58172 20.5 4 16.9183 4 12.5C4 8.08172 7.58172 4.5 12 4.5C16.4183 4.5 20 8.08172 20 12.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M5.70711 2.79289C5.31658 2.40237 4.68342 2.40237 4.29289 2.79289L2.29289 4.79289C1.90237 5.18342 1.90237 5.81658 2.29289 6.20711C2.68342 6.59763 3.31658 6.59763 3.70711 6.20711L5.70711 4.20711C6.09763 3.81658 6.09763 3.18342 5.70711 2.79289Z" fill={color}/>
<path d="M19.7071 2.79289C19.3166 2.40237 18.6834 2.40237 18.2929 2.79289C17.9024 3.18342 17.9024 3.81658 18.2929 4.20711L20.2929 6.20711C20.6834 6.59763 21.3166 6.59763 21.7071 6.20711C22.0976 5.81658 22.0976 5.18342 21.7071 4.79289L19.7071 2.79289Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M3 12.5C3 7.52944 7.02944 3.5 12 3.5C16.9706 3.5 21 7.52944 21 12.5C21 17.4706 16.9706 21.5 12 21.5C7.02944 21.5 3 17.4706 3 12.5ZM13 8.5C13 7.94772 12.5523 7.5 12 7.5C11.4477 7.5 11 7.94772 11 8.5V11.5003L8.00014 11.5C7.44785 11.4999 7.00008 11.9476 7 12.4999C6.99992 13.0521 7.44758 13.4999 7.99986 13.5L11 13.5003V16.5C11 17.0523 11.4477 17.5 12 17.5C12.5523 17.5 13 17.0523 13 16.5V13.5005L15.9999 13.5008C16.5521 13.5009 16.9999 13.0532 17 12.501C17.0001 11.9487 16.5524 11.5009 16.0001 11.5008L13 11.5005V8.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-plus', ClockPlus);
