import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const HeadphonesAlt2: React.FC<IconComponentProps> = ({
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
        <><path d="M3 11.3C3 6.32949 7.02944 2.30005 12 2.30005C16.9706 2.30005 21 6.32949 21 11.3M3 11.3H5C6.10457 11.3 7 12.1955 7 13.3V15.3C7 16.4046 6.10457 17.3 5 17.3M3 11.3V16.3C3 16.8523 3.44772 17.3 4 17.3H5M21 11.3H19C17.8954 11.3 17 12.1955 17 13.3V15.3C17 16.4046 17.8954 17.3 19 17.3H20C20.5523 17.3 21 16.8523 21 16.3V11.3ZM5 17.3V18.3C5 19.4046 5.89543 20.3 7 20.3H9M9 20.3C9 21.1285 9.67157 21.8 10.5 21.8H11.5C12.3284 21.8 13 21.1285 13 20.3C13 19.4716 12.3284 18.8 11.5 18.8H10.5C9.67157 18.8 9 19.4716 9 20.3Z" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4.99994 10.5H4.06189C4.55399 6.55369 7.92038 3.5 12 3.5C16.0796 3.5 19.446 6.55369 19.9381 10.5H19.0001C17.3433 10.5 16 11.8431 16 13.5V15.5C16 17.1569 17.3431 18.5 19 18.5H20C21.1046 18.5 22 17.6057 22 16.5012C22 14.7015 22 12.2305 22 11.5C22 5.97715 17.5228 1.5 12 1.5C6.47715 1.5 2 5.97715 2 11.5V16.5C2 17.6046 2.89543 18.5 4 18.5C4 20.1569 5.34315 21.5 7 21.5H8.26756C8.61337 22.0978 9.25972 22.5 10 22.5H12C13.1046 22.5 14 21.6046 14 20.5C14 19.3954 13.1046 18.5 12 18.5H10C9.25972 18.5 8.61337 18.9022 8.26756 19.5H7C6.44772 19.5 6 19.0523 6 18.5V18.3293C7.16519 17.9175 8 16.8062 8 15.5V13.5C8 11.8431 6.65675 10.5 4.99994 10.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('headphones-alt-2', HeadphonesAlt2);
