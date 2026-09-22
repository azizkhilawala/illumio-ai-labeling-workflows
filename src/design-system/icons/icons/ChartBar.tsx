import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ChartBar: React.FC<IconComponentProps> = ({
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
        <><path d="M3 3V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H21M19 15H7M18 7H7M15 11H7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 2C3.55229 2 4 2.44772 4 3V16.2C4 17.0566 4.00078 17.6389 4.03755 18.089C4.07337 18.5274 4.1383 18.7516 4.21799 18.908C4.40974 19.2843 4.7157 19.5903 5.09202 19.782C5.24842 19.8617 5.47262 19.9266 5.91104 19.9624C6.36113 19.9992 6.94342 20 7.8 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H7.75868C6.95372 22 6.28936 22 5.74817 21.9558C5.18608 21.9099 4.66937 21.8113 4.18404 21.564C3.43139 21.1805 2.81947 20.5686 2.43598 19.816C2.18868 19.3306 2.09012 18.8139 2.04419 18.2518C1.99998 17.7106 1.99999 17.0463 2 16.2413L2 3C2 2.44772 2.44772 2 3 2ZM6 7C6 6.44772 6.44772 6 7 6H18C18.5523 6 19 6.44772 19 7C19 7.55228 18.5523 8 18 8H7C6.44772 8 6 7.55228 6 7ZM6 11C6 10.4477 6.44772 10 7 10H15C15.5523 10 16 10.4477 16 11C16 11.5523 15.5523 12 15 12H7C6.44772 12 6 11.5523 6 11ZM6 15C6 14.4477 6.44772 14 7 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H7C6.44772 16 6 15.5523 6 15Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('chart-bar', ChartBar);
