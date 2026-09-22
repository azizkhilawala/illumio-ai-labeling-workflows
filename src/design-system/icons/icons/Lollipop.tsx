import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Lollipop: React.FC<IconComponentProps> = ({
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
        <><path d="M21 21L15.8033 15.8033M15.8033 15.8033C17.1605 14.4461 18 12.5711 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C12.5711 18 14.4461 17.1605 15.8033 15.8033ZM15 10.5C15 8.01472 12.9853 6 10.5 6C8.01472 6 6 8.01472 6 10.5C6 12.9853 8.01472 15 10.5 15C12.9853 15 15 12.9853 15 10.5ZM12 10.5C12 9.67157 11.3284 9 10.5 9C9.67157 9 9 9.67157 9 10.5C9 11.3284 9.67157 12 10.5 12C11.3284 12 12 11.3284 12 10.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 10.5C8 9.11929 9.11929 8 10.5 8C11.8807 8 13 9.11929 13 10.5C13 11.8807 11.8807 13 10.5 13C9.11929 13 8 11.8807 8 10.5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.5 5C7.46243 5 5 7.46243 5 10.5C5 13.5376 7.46243 16 10.5 16C13.5376 16 16 13.5376 16 10.5C16 7.46243 13.5376 5 10.5 5ZM7 10.5C7 8.567 8.567 7 10.5 7C12.433 7 14 8.567 14 10.5C14 12.433 12.433 14 10.5 14C8.567 14 7 12.433 7 10.5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.4869 19 14.3145 18.3183 15.7618 17.176L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.176 15.7618C18.3183 14.3145 19 12.4869 19 10.5C19 5.80558 15.1944 2 10.5 2ZM4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('lollipop', Lollipop);
