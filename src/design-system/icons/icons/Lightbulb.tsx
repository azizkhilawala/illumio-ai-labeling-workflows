import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Lightbulb: React.FC<IconComponentProps> = ({
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
        <><path d="M15 16V18C15 18.9319 15 19.3978 14.8478 19.7654C14.6448 20.2554 14.2554 20.6448 13.7654 20.8478C13.3978 21 12.9319 21 12 21C11.0681 21 10.6022 21 10.2346 20.8478C9.74458 20.6448 9.35523 20.2554 9.15224 19.7654C9 19.3978 9 18.9319 9 18V16M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10C19 12.5463 17.6404 14.7751 15.6076 16H8.39241C6.35958 14.7751 5 12.5463 5 10Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M16 18H8V18.032C7.99999 18.4706 7.99998 18.8491 8.02135 19.1624C8.04385 19.4922 8.09336 19.8221 8.22836 20.1481C8.53284 20.8831 9.11687 21.4672 9.85195 21.7716C10.1779 21.9066 10.5078 21.9561 10.8376 21.9787C11.1509 22 11.5294 22 11.968 22H12.032C12.4706 22 12.8491 22 13.1624 21.9787C13.4922 21.9561 13.8221 21.9066 14.1481 21.7716C14.8831 21.4672 15.4672 20.8831 15.7716 20.1481C15.9066 19.8221 15.9561 19.4922 15.9787 19.1624C16 18.8491 16 18.4707 16 18.032V18Z" fill={color}/>
<path d="M6.70851 16C5.04873 14.535 4 12.3903 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 12.3903 18.9513 14.535 17.2915 16H6.70851Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('lightbulb', Lightbulb);
