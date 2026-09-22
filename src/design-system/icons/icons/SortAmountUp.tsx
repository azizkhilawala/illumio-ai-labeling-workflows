import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const SortAmountUp: React.FC<IconComponentProps> = ({
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
        <><path d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M5.29289 6.29289C5.68342 5.90237 6.31658 5.90237 6.70711 6.29289L9.70711 9.29289C10.0976 9.68342 10.0976 10.3166 9.70711 10.7071C9.31658 11.0976 8.68342 11.0976 8.29289 10.7071L7 9.41421V17C7 17.5523 6.55228 18 6 18C5.44772 18 5 17.5523 5 17V9.41421L3.70711 10.7071C3.31658 11.0976 2.68342 11.0976 2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L5.29289 6.29289ZM12 8C12 7.44772 12.4477 7 13 7H21C21.5523 7 22 7.44772 22 8C22 8.55228 21.5523 9 21 9H13C12.4477 9 12 8.55228 12 8ZM12 12C12 11.4477 12.4477 11 13 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13C12.4477 13 12 12.5523 12 12ZM12 16C12 15.4477 12.4477 15 13 15H21C21.5523 15 22 15.4477 22 16C22 16.5523 21.5523 17 21 17H13C12.4477 17 12 16.5523 12 16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('sort-amount-up', SortAmountUp);
