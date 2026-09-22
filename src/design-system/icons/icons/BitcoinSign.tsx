import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BitcoinSign: React.FC<IconComponentProps> = ({
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
        <><path d="M10 6H15C16.6569 6 18 7.34315 18 9C18 10.6569 16.6569 12 15 12M10 6V12M10 6H7M10 6V3M15 12H10M15 12C16.6569 12 18 13.3431 18 15C18 16.6569 16.6569 18 15 18H10M10 12V18M10 18H7M10 18V21M13 6V3M13 21V18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M10 2C10.5523 2 11 2.44772 11 3V5H12V3C12 2.44772 12.4477 2 13 2C13.5523 2 14 2.44772 14 3V5H15C17.2091 5 19 6.79086 19 9C19 10.1947 18.4762 11.2671 17.6458 12C18.4762 12.7329 19 13.8053 19 15C19 17.2091 17.2091 19 15 19H14V21C14 21.5523 13.5523 22 13 22C12.4477 22 12 21.5523 12 21V19H11V21C11 21.5523 10.5523 22 10 22C9.44772 22 9 21.5523 9 21V19H7C6.44772 19 6 18.5523 6 18C6 17.4477 6.44772 17 7 17H9V7H7C6.44772 7 6 6.55228 6 6C6 5.44772 6.44772 5 7 5H9V3C9 2.44772 9.44772 2 10 2ZM11 7V11H15C16.1046 11 17 10.1046 17 9C17 7.89543 16.1046 7 15 7H11ZM15 13H11V17H15C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bitcoin-sign', BitcoinSign);
