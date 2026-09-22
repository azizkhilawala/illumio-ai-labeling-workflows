import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Loop: React.FC<IconComponentProps> = ({
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
        <><path d="M18 4L21 7M21 7L18 10M21 7H7C4.79086 7 3 8.79086 3 11M6 20L3 17M3 17L6 14M3 17H17C19.2091 17 21 15.2091 21 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M17.2929 3.29289C17.6834 2.90237 18.3166 2.90237 18.7071 3.29289L21.7071 6.29289C22.0976 6.68342 22.0976 7.31658 21.7071 7.70711L18.7071 10.7071C18.3166 11.0976 17.6834 11.0976 17.2929 10.7071C16.9024 10.3166 16.9024 9.68342 17.2929 9.29289L18.5858 8H7C5.34315 8 4 9.34315 4 11C4 11.5523 3.55228 12 3 12C2.44772 12 2 11.5523 2 11C2 8.23858 4.23858 6 7 6H18.5858L17.2929 4.70711C16.9024 4.31658 16.9024 3.68342 17.2929 3.29289ZM6.70711 13.2929C7.09763 13.6834 7.09763 14.3166 6.70711 14.7071L5.41421 16H17C18.6569 16 20 14.6569 20 13C20 12.4477 20.4477 12 21 12C21.5523 12 22 12.4477 22 13C22 15.7614 19.7614 18 17 18H5.41421L6.70711 19.2929C7.09763 19.6834 7.09763 20.3166 6.70711 20.7071C6.31658 21.0976 5.68342 21.0976 5.29289 20.7071L2.29289 17.7071C1.90237 17.3166 1.90237 16.6834 2.29289 16.2929L5.29289 13.2929C5.68342 12.9024 6.31658 12.9024 6.70711 13.2929Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('loop', Loop);
