import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Superscript: React.FC<IconComponentProps> = ({
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
        <><path d="M9 13L5 6H3M9 13L13 20H15M9 13L13 6H15M9 13L5 20H3M17 4L19 3V9M19 9H17M19 9H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M19.5257 2.14935C19.8205 2.33156 20 2.65342 20 3V8H21C21.5523 8 22 8.44772 22 9C22 9.55229 21.5523 10 21 10H17C16.4477 10 16 9.55229 16 9C16 8.44772 16.4477 8 17 8H18V4.61803L17.4472 4.89443C16.9532 5.14142 16.3526 4.94119 16.1056 4.44721C15.8586 3.95324 16.0588 3.35256 16.5528 3.10557L18.5528 2.10557C18.8628 1.95058 19.2309 1.96714 19.5257 2.14935ZM2 6C2 5.44772 2.44772 5 3 5H5C5.35886 5 5.6902 5.19229 5.86824 5.50386L9 10.9844L12.1318 5.50386C12.3098 5.19229 12.6411 5 13 5H15C15.5523 5 16 5.44772 16 6C16 6.55229 15.5523 7 15 7H13.5803L10.1518 13L13.5803 19H15C15.5523 19 16 19.4477 16 20C16 20.5523 15.5523 21 15 21H13C12.6411 21 12.3098 20.8077 12.1318 20.4961L9 15.0156L5.86824 20.4961C5.6902 20.8077 5.35886 21 5 21H3C2.44772 21 2 20.5523 2 20C2 19.4477 2.44772 19 3 19H4.41968L7.84825 13L4.41968 7H3C2.44772 7 2 6.55229 2 6Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('superscript', Superscript);
