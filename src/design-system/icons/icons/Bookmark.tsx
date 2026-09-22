import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Bookmark: React.FC<IconComponentProps> = ({
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
        <><path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.16146 2H15.8385C16.3657 1.99998 16.8205 1.99997 17.195 2.03057C17.5904 2.06287 17.9836 2.13419 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C19.8658 4.01641 19.9371 4.40963 19.9694 4.80497C20 5.17955 20 5.63432 20 6.16148V21C20 21.3746 19.7907 21.7178 19.4576 21.8892C19.1245 22.0606 18.7236 22.0315 18.4188 21.8137L12 17.2289L5.58124 21.8137C5.27643 22.0315 4.87549 22.0606 4.54242 21.8892C4.20935 21.7178 4 21.3746 4 21L4 6.16146C3.99998 5.63431 3.99997 5.17955 4.03057 4.80497C4.06287 4.40963 4.13419 4.01641 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.01641 2.13419 6.40963 2.06287 6.80497 2.03057C7.17955 1.99997 7.63431 1.99998 8.16146 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('bookmark', Bookmark);
