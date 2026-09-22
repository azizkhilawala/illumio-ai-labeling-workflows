import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const InformationAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 4H12.01M12.01 10L12 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 5C12.5523 5 13 4.55228 13 4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4C11 4.55228 11.4477 5 12 5Z" fill={color}/>
<path d="M12 9C11.4477 9 11 9.44771 11 10V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V10C13 9.44772 12.5523 9 12 9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('information-alt', InformationAlt);
