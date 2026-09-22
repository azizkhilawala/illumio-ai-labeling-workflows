import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Fireplace: React.FC<IconComponentProps> = ({
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
        <><path d="M3 4H21M3 8H21M19 4V20M5 4V20M13.7678 19.219C12.7915 20.2604 11.2085 20.2604 10.2322 19.219C9.74408 18.6983 9.5 18.0158 9.5 17.3333C9.5 16.6509 9.74408 15.9684 10.2322 15.4477C10.2322 15.4477 10.4375 16 11.0625 16.3333C11.0625 15.6667 11.2188 14.6667 11.9956 14C12.625 14.6667 13.2785 14.9258 13.7678 15.4477C14.2559 15.9684 14.5 16.6509 14.5 17.3333C14.5 18.0158 14.2559 18.6983 13.7678 19.219Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H4V7H3C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H4V20C4 20.5523 4.44772 21 5 21C5.55228 21 6 20.5523 6 20V9H18V20C18 20.5523 18.4477 21 19 21C19.5523 21 20 20.5523 20 20V9H21C21.5523 9 22 8.55228 22 8C22 7.44772 21.5523 7 21 7H20V5H21C21.5523 5 22 4.55228 22 4C22 3.44772 21.5523 3 21 3H3Z" fill={color}/>
<path d="M9.87868 20.0888C11.0503 21.3037 12.9497 21.3037 14.1213 20.0888C14.7071 19.4813 15 18.6851 15 17.8889C15 17.0927 14.7071 16.2965 14.1213 15.689C13.8447 15.4021 13.5243 15.1833 13.1839 14.9507C12.8017 14.6897 12.3941 14.4113 11.9947 14C11.0625 14.7778 10.875 15.9444 10.875 16.7222C10.125 16.3333 9.87868 15.689 9.87868 15.689C9.29289 16.2965 9 17.0927 9 17.8889C9 18.6851 9.29289 19.4813 9.87868 20.0888Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('fireplace', Fireplace);
