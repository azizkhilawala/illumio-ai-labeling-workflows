import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Check: React.FC<IconComponentProps> = ({
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
        <><path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M20.7096 5.79536C21.0987 6.18724 21.0965 6.82041 20.7046 7.20957L9.62772 18.2096C9.23776 18.5968 8.60839 18.5968 8.21844 18.2096L3.29536 13.3207C2.90348 12.9315 2.90127 12.2984 3.29043 11.9065C3.67959 11.5146 4.31276 11.5124 4.70464 11.9015L8.92308 16.0907L19.2954 5.79043C19.6872 5.40127 20.3204 5.40348 20.7096 5.79536Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('check', Check);
