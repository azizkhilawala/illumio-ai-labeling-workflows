import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GaugeMax: React.FC<IconComponentProps> = ({
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
        <><path d="M14 14L18 12M16 8H16.01M12 6H12.01M8 8H8.01M6 12H6.01M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 7C12.5523 7 13 6.55228 13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6C11 6.55228 11.4477 7 12 7ZM9 8C9 8.55229 8.55229 9 8 9C7.44772 9 7 8.55229 7 8C7 7.44772 7.44772 7 8 7C8.55229 7 9 7.44772 9 8ZM6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13ZM17 8C17 8.55229 16.5523 9 16 9C15.4477 9 15 8.55229 15 8C15 7.44772 15.4477 7 16 7C16.5523 7 17 7.44772 17 8ZM18.8944 11.553C19.1414 12.047 18.9412 12.6477 18.4472 12.8946L14.9773 14.6296C14.9923 14.751 15 14.8747 15 15.0002C15 16.6571 13.6569 18.0002 12 18.0002C10.3431 18.0002 9 16.6571 9 15.0002C9 13.3434 10.3431 12.0002 12 12.0002C12.8089 12.0002 13.543 12.3204 14.0826 12.8409L17.5528 11.1058C18.0468 10.8588 18.6474 11.059 18.8944 11.553Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gauge-max', GaugeMax);
