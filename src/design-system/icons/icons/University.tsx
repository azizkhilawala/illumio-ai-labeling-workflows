import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const University: React.FC<IconComponentProps> = ({
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
        <><path d="M5 8V17.0192M9 8V17M15 8V17M19 8V17.0192M5 17.0192C5.31428 17 5.70173 17 6.2 17H17.8C18.2983 17 18.6857 17 19 17.0192M5 17.0192C4.60779 17.0431 4.32953 17.097 4.09202 17.218C3.71569 17.4097 3.40973 17.7157 3.21799 18.092C3 18.5198 3 19.0799 3 20.2V21H21V20.2C21 19.0799 21 18.5198 20.782 18.092C20.5903 17.7157 20.2843 17.4097 19.908 17.218C19.6705 17.097 19.3922 17.0431 19 17.0192M3 5.5V8H21V5.5L12 3L3 5.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M11.7324 2.03648C11.9075 1.98784 12.0925 1.98784 12.2676 2.03648L21.2676 4.53648C21.7005 4.65671 22 5.05079 22 5.5V8C22 8.55228 21.5523 9 21 9H20V16.1783C20.1219 16.2175 20.2427 16.2662 20.362 16.327C20.9265 16.6146 21.3854 17.0735 21.673 17.638C21.8658 18.0164 21.9371 18.4096 21.9694 18.805C22 19.1795 22 19.6343 22 20.1614V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21L2 20.1615C1.99998 19.6343 1.99997 19.1795 2.03057 18.805C2.06287 18.4096 2.13419 18.0164 2.32698 17.638C2.6146 17.0735 3.07354 16.6146 3.63803 16.327C3.75734 16.2662 3.87813 16.2175 4 16.1783V9H3C2.44772 9 2 8.55228 2 8V5.5C2 5.05079 2.29954 4.65671 2.73236 4.53648L11.7324 2.03648ZM6 9V16C6.05305 16 6.10687 16 6.16148 16H8V9H6ZM10 9V16H14V9H10ZM16 9V16H17.8385C17.8931 16 17.947 16 18 16V9H16Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('university', University);
