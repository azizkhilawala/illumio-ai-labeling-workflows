import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketRoundRight: React.FC<IconComponentProps> = ({
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
        <><path d="M10 3C12.2415 5.33579 13.6191 8.50702 13.6191 12C13.6191 15.493 12.2415 18.6642 10 21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.3076 2.27849C8.90912 2.66089 8.89608 3.29392 9.27848 3.6924C11.3485 5.84946 12.6191 8.77529 12.6191 12C12.6191 15.2247 11.3485 18.1505 9.27848 20.3076C8.89608 20.7061 8.90912 21.3391 9.3076 21.7215C9.70608 22.1039 10.3391 22.0909 10.7215 21.6924C13.1346 19.1779 14.6191 15.7613 14.6191 12C14.6191 8.23874 13.1346 4.82212 10.7215 2.3076C10.3391 1.90912 9.70608 1.89609 9.3076 2.27849Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bracket-round-right', BracketRoundRight);
