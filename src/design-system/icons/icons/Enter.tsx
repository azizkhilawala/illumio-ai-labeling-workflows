import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Enter: React.FC<IconComponentProps> = ({
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
        <><path d="M20 7V8.2C20 9.88016 20 10.7202 19.673 11.362C19.3854 11.9265 18.9265 12.3854 18.362 12.673C17.7202 13 16.8802 13 15.2 13H4M4 13L8 9M4 13L8 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M20 6C20.5523 6 21 6.44772 21 7V8.24132C21 9.04628 21 9.71064 20.9558 10.2518C20.9099 10.8139 20.8113 11.3306 20.564 11.816C20.1805 12.5686 19.5686 13.1805 18.816 13.564C18.3306 13.8113 17.8139 13.9099 17.2518 13.9558C16.7106 14 16.0463 14 15.2413 14H6.41421L8.70711 16.2929C9.09763 16.6834 9.09763 17.3166 8.70711 17.7071C8.31658 18.0976 7.68342 18.0976 7.29289 17.7071L3.29289 13.7071C2.90237 13.3166 2.90237 12.6834 3.29289 12.2929L7.29289 8.29289C7.68342 7.90237 8.31658 7.90237 8.70711 8.29289C9.09763 8.68342 9.09763 9.31658 8.70711 9.70711L6.41421 12H15.2C16.0566 12 16.6389 11.9992 17.089 11.9624C17.5274 11.9266 17.7516 11.8617 17.908 11.782C18.2843 11.5903 18.5903 11.2843 18.782 10.908C18.8617 10.7516 18.9266 10.5274 18.9624 10.089C18.9992 9.63887 19 9.05658 19 8.2V7C19 6.44772 19.4477 6 20 6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('enter', Enter);
