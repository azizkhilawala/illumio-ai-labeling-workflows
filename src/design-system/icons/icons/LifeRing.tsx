import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const LifeRing: React.FC<IconComponentProps> = ({
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
        <><path d="M18.3795 5.65166L14.1055 9.86303M9.89445 14.137L5.63994 18.3679M5.63408 5.63799L9.89445 9.86303M14.1056 14.137L18.364 18.364M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 2C9.60004 2 7.39754 2.84544 5.67409 4.25475L9.98565 8.54347C10.5772 8.19797 11.2655 8 12 8C12.7345 8 13.4228 8.19797 14.0143 8.54347L18.3259 4.25475C16.6025 2.84544 14.4 2 12 2Z" fill={color}/>
<path d="M2 12C2 9.59742 2.84729 7.39274 4.25936 5.66846L8.56423 9.95052C8.20592 10.5499 8 11.2509 8 12C8 12.7492 8.20596 13.4503 8.56436 14.0497L4.25939 18.3316C2.8473 16.6073 2 14.4026 2 12Z" fill={color}/>
<path d="M5.67412 19.7453C7.39757 21.1546 9.60006 22 12 22C14.3999 22 16.6024 21.1546 18.3259 19.7453L14.0141 15.4567C13.4226 15.8021 12.7344 16 12 16C11.2656 16 10.5774 15.8021 9.98587 15.4567L5.67412 19.7453Z" fill={color}/>
<path d="M22 12C22 14.4026 21.1527 16.6073 19.7406 18.3316L15.4356 14.0497C15.794 13.4503 16 12.7492 16 12C16 11.2509 15.7941 10.5499 15.4358 9.95051L19.7406 5.66845C21.1527 7.39274 22 9.59742 22 12Z" fill={color}/>
<path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('life-ring', LifeRing);
