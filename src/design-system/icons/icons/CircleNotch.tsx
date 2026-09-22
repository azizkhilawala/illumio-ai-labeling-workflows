import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CircleNotch: React.FC<IconComponentProps> = ({
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
        <><path d="M9 3.51215C5.50442 4.74766 3 8.08137 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.08137 18.4956 4.74766 15 3.51215" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.94284 3.17887C10.1269 3.69958 9.85396 4.27091 9.33325 4.45495C6.22472 5.55366 4 8.51831 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 8.51831 17.7753 5.55366 14.6668 4.45495C14.146 4.27091 13.8731 3.69958 14.0572 3.17887C14.2412 2.65815 14.8125 2.38523 15.3332 2.56927C19.2159 3.94158 22 7.64437 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 7.64437 4.78413 3.94158 8.66675 2.56927C9.18747 2.38523 9.75879 2.65815 9.94284 3.17887Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('circle-notch', CircleNotch);
