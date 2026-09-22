import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Repeat: React.FC<IconComponentProps> = ({
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
        <><path d="M14 7H15.9992C19.3129 7 21.9992 9.68629 21.9992 13C21.9992 16.3137 19.3129 19 15.9992 19H8C4.68629 19 2 16.3137 2 13C2 9.68629 4.68629 7 8 7H10M7 4L10 7M10 7L7 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6.29289 3.29289C6.68342 2.90237 7.31658 2.90237 7.70711 3.29289L10.7071 6.29289C11.0976 6.68342 11.0976 7.31658 10.7071 7.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289L7.56733 8.01846C5.00848 8.23779 3 10.3843 3 13C3 15.7614 5.23858 18 8 18H15.9992C18.7606 18 20.9992 15.7614 20.9992 13C20.9992 10.2386 18.7606 8 15.9992 8H14C13.4477 8 13 7.55228 13 7C13 6.44772 13.4477 6 14 6H15.9992C19.8652 6 22.9992 9.13401 22.9992 13C22.9992 16.866 19.8652 20 15.9992 20H8C4.13401 20 1 16.866 1 13C1 9.26921 3.91863 6.2201 7.59718 6.0114L6.29289 4.70711C5.90237 4.31658 5.90237 3.68342 6.29289 3.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('repeat', Repeat);
