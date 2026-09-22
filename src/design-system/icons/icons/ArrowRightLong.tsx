import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowRightLong: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M13.0507 8.74487H2.8V9.65865H13.0507V11.3333L15.6 9.19998L13.0507 7.06665V8.74487Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-right-long', ArrowRightLong);
