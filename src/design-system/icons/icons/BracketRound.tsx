import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketRound: React.FC<IconComponentProps> = ({
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
        <><path d="M13.6191 3C11.3776 5.33579 10 8.50702 10 12C10 15.493 11.3776 18.6642 13.6191 21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M14.3115 2.27849C14.71 2.66089 14.7231 3.29392 14.3407 3.6924C12.2706 5.84946 11 8.77529 11 12C11 15.2247 12.2706 18.1505 14.3407 20.3076C14.7231 20.7061 14.71 21.3391 14.3115 21.7215C13.9131 22.1039 13.28 22.0909 12.8976 21.6924C10.4846 19.1779 9 15.7613 9 12C9 8.23874 10.4846 4.82212 12.8976 2.3076C13.28 1.90912 13.9131 1.89609 14.3115 2.27849Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bracket-round', BracketRound);
