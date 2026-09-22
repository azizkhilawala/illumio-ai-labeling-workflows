import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MedalAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 11L8 3H4L8.5058 12.4622M12 11L16 3H20L15.4942 12.4622M12 11C13.344 11 14.5848 11.5635 15.4942 12.4622M12 11C10.656 11 9.41518 11.5635 8.5058 12.4622M15.4942 12.4622C16.4182 13.3753 17 14.6344 17 16C17 18.7614 14.7614 21 12 21C9.23858 21 7 18.7614 7 16C7 14.6344 7.58179 13.3753 8.5058 12.4622" stroke={color} strokeWidth="2" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 2C3.65684 2 3.33765 2.17595 3.15444 2.46611C2.97124 2.75628 2.94961 3.12011 3.09714 3.42993L6.84639 11.3033C6.92878 11.2132 7.01335 11.1252 7.1 11.0396C8.35331 9.80107 10.0884 9 12 9C13.9116 9 15.6467 9.80107 16.9 11.0396C16.9866 11.1252 17.0712 11.2132 17.1536 11.3033L20.9029 3.42993C21.0504 3.12011 21.0288 2.75628 20.8456 2.46611C20.6624 2.17595 20.3432 2 20 2H16C15.6212 2 15.275 2.214 15.1056 2.55279L12 8.76393L8.89443 2.55279C8.72504 2.214 8.37877 2 8 2H4Z" fill={color}/>
<path d="M12 22C15.3137 22 18 19.3137 18 16C18 12.6863 15.3137 10 12 10C8.68629 10 6 12.6863 6 16C6 19.3137 8.68629 22 12 22Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('medal-alt', MedalAlt);
