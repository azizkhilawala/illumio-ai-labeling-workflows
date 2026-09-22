import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LightbulbExclamation: React.FC<IconComponentProps> = ({
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
        <><path d="M12 7V10M12 13H12.01M15 17V18C15 18.9319 15 19.3978 14.8478 19.7654C14.6448 20.2554 14.2554 20.6448 13.7654 20.8478C13.3978 21 12.9319 21 12 21C11.0681 21 10.6022 21 10.2346 20.8478C9.74458 20.6448 9.35523 20.2554 9.15224 19.7654C9 19.3978 9 18.9319 9 18V17M5 10.2414C5 6.24208 8.13401 3 12 3C15.866 3 19 6.24208 19 10.2414C19 13.2108 17.2723 15.8826 14.8 17H9.2C6.72773 15.8826 5 13.2108 5 10.2414Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4 10C4 12.3903 5.04873 14.535 6.70851 16H17.2915C18.9513 14.535 20 12.3903 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10ZM11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10V7ZM13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z" fill={color}/>
<path d="M8 18.032V18H16V18.032C16 18.4707 16 18.8491 15.9787 19.1624C15.9561 19.4922 15.9066 19.8221 15.7716 20.1481C15.4672 20.8831 14.8831 21.4672 14.1481 21.7716C13.8221 21.9066 13.4922 21.9561 13.1624 21.9787C12.8491 22 12.4706 22 12.032 22H11.968C11.5294 22 11.1509 22 10.8376 21.9787C10.5078 21.9561 10.1779 21.9066 9.85195 21.7716C9.11687 21.4672 8.53284 20.8831 8.22836 20.1481C8.09336 19.8221 8.04385 19.4922 8.02135 19.1624C7.99998 18.8491 7.99999 18.4706 8 18.032Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('lightbulb-exclamation', LightbulbExclamation);
