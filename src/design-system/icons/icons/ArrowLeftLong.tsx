import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowLeftLong: React.FC<IconComponentProps> = ({
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
<path d="M5.34934 7.06665L2.8 9.19998L5.34934 11.3333V9.65865H15.6V8.74487H5.34934V7.06665Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-left-long', ArrowLeftLong);
