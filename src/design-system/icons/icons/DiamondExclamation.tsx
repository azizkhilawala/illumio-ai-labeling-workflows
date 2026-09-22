import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DiamondExclamation: React.FC<IconComponentProps> = ({
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
        <><path d="M12.0001 9.00001V12M12.0001 15H12.0101M3 12L12.0001 2.99994L21.0001 12L12.0001 21.0001L3 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.7072 2.29289C12.3167 1.90237 11.6835 1.90237 11.293 2.29289L2.29289 11.293C1.90237 11.6835 1.90237 12.3167 2.29289 12.7072L11.293 21.7072C11.6835 22.0978 12.3167 22.0978 12.7072 21.7072L21.7072 12.7072C22.0978 12.3167 22.0978 11.6835 21.7072 11.293L12.7072 2.29289ZM12 8C12.5523 8 13 8.44772 13 9V12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12V9C11 8.44772 11.4477 8 12 8ZM13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('diamond-exclamation', DiamondExclamation);
