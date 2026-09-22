import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ToiletPortable: React.FC<IconComponentProps> = ({
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
        <><path d="M7 7H17M7 21V4.6C7 4.03995 7 3.75992 7.10899 3.54601C7.20487 3.35785 7.35785 3.20487 7.54601 3.10899C7.75992 3 8.03995 3 8.6 3H15.4C15.9601 3 16.2401 3 16.454 3.10899C16.6422 3.20487 16.7951 3.35785 16.891 3.54601C17 3.75992 17 4.03995 17 4.6V21M7 19H17M14 13H14.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M6.00005 5C6.00082 4.01165 6.01338 3.49359 6.21799 3.09202C6.40973 2.71569 6.71569 2.40973 7.09202 2.21799C7.51984 2 8.0799 2 9.2 2H14.8C15.9201 2 16.4802 2 16.908 2.21799C17.2843 2.40973 17.5903 2.71569 17.782 3.09202C17.9866 3.49359 17.9992 4.01165 17.9999 5H6.00005Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M6 7V21C6 21.5523 6.44772 22 7 22C7.55228 22 8 21.5523 8 21V20H16V21C16 21.5523 16.4477 22 17 22C17.5523 22 18 21.5523 18 21V7H6ZM15 14C15.5523 14 16 13.5523 16 13C16 12.4477 15.5523 12 15 12C14.4477 12 14 12.4477 14 13C14 13.5523 14.4477 14 15 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('toilet-portable', ToiletPortable);
