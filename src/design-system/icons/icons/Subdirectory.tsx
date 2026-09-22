import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Subdirectory: React.FC<IconComponentProps> = ({
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
        <><path d="M3 7V8.2C3 9.88016 3 10.7202 3.32698 11.362C3.6146 11.9265 4.07354 12.3854 4.63803 12.673C5.27976 13 6.11984 13 7.8 13H21M21 13L17 9M21 13L17 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 6C3.55229 6 4 6.44772 4 7V8.2C4 9.05658 4.00078 9.63887 4.03755 10.089C4.07337 10.5274 4.1383 10.7516 4.21799 10.908C4.40973 11.2843 4.71569 11.5903 5.09202 11.782C5.24842 11.8617 5.47262 11.9266 5.91104 11.9624C6.36113 11.9992 6.94342 12 7.8 12H18.5858L16.2929 9.70711C15.9024 9.31658 15.9024 8.68342 16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289L21.7071 12.2929C22.0976 12.6834 22.0976 13.3166 21.7071 13.7071L17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071C15.9024 17.3166 15.9024 16.6834 16.2929 16.2929L18.5858 14H7.7587C6.95373 14 6.28937 14 5.74817 13.9558C5.18608 13.9099 4.66937 13.8113 4.18404 13.564C3.43139 13.1805 2.81947 12.5686 2.43597 11.816C2.18868 11.3306 2.09012 10.8139 2.04419 10.2518C1.99998 9.71063 1.99999 9.04627 2 8.2413C2.00001 7.82753 2 7.41377 2 7C2 6.44772 2.44772 6 3 6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('subdirectory', Subdirectory);
