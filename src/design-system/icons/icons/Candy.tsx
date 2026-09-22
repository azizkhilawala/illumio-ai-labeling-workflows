import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Candy: React.FC<IconComponentProps> = ({
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
        <><path d="M7 9H17V15H7V9Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
<path d="M3 9L7 12L3 15V9Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
<path d="M21 9L17 12L21 15V9Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.55279 8.10558C2.89157 7.93619 3.29698 7.97274 3.6 8.20001L6 10V9.00001C6 8.44772 6.44772 8.00001 7 8.00001H17C17.5523 8.00001 18 8.44772 18 9.00001V10L20.4 8.20001C20.703 7.97274 21.1084 7.93619 21.4472 8.10558C21.786 8.27497 22 8.62123 22 9.00001V15C22 15.3788 21.786 15.725 21.4472 15.8944C21.1084 16.0638 20.703 16.0273 20.4 15.8L18 14V15C18 15.5523 17.5523 16 17 16H7C6.44772 16 6 15.5523 6 15V14L3.6 15.8C3.29698 16.0273 2.89157 16.0638 2.55279 15.8944C2.214 15.725 2 15.3788 2 15V9.00001C2 8.62123 2.214 8.27497 2.55279 8.10558ZM4 13L5.33333 12L4 11V13ZM18.6667 12L20 13V11L18.6667 12Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('candy', Candy);
