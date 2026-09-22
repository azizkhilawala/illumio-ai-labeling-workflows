import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CrosshairSimple: React.FC<IconComponentProps> = ({
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
        <><path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H17M12 21C7.02944 21 3 16.9706 3 12M12 21V17M3 12C3 7.02944 7.02944 3 12 3M3 12H7M12 3V7M12 12H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM7 11H4.06189C4.51314 7.38128 7.38128 4.51314 11 4.06189V7C11 7.55228 11.4477 8 12 8C12.5523 8 13 7.55228 13 7V4.06189C16.6187 4.51314 19.4869 7.38128 19.9381 11H17C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13H19.9381C19.4869 16.6187 16.6187 19.4869 13 19.9381V17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17V19.9381C7.38128 19.4869 4.51314 16.6187 4.06189 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('crosshair-simple', CrosshairSimple);
