import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Loading: React.FC<IconComponentProps> = ({
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
<path fillRule="evenodd" clipRule="evenodd" d="M10.8604 7.26355V10.7364L14.3333 8.99998L10.8604 7.26355Z" fill={color}/>
<path d="M10.8605 8.50391H3.66666V9.49615H10.8605V8.50391Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('loading', Loading);
