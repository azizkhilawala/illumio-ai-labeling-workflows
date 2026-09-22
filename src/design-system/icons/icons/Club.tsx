import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Club: React.FC<IconComponentProps> = ({
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
        <><path d="M12 16.0004L12 20.9999M12 16.0004C11.1643 16.6281 10.1256 17 9 17C6.23858 17 4 14.7614 4 12C4 9.93595 5.25068 8.16402 7.03555 7.40068C7.33166 4.92182 9.4414 3 12 3C14.5586 3 16.6683 4.92182 16.9645 7.40068C18.7493 8.16402 20 9.93595 20 12C20 14.7614 17.7614 17 15 17C13.8744 17 12.8357 16.6281 12 16.0004ZM9 20.9999H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6.13553 6.72688C6.71979 4.02436 9.12284 2 12 2C14.8772 2 17.2802 4.02436 17.8645 6.72689C19.731 7.74285 21 9.72226 21 12C21 15.3137 18.3137 18 15 18C14.2993 18 13.6259 17.8796 13 17.6583L13 19.9999H15C15.5523 19.9999 16 20.4476 16 20.9999C16 21.5522 15.5523 21.9999 15 21.9999H9C8.44772 21.9999 8 21.5522 8 20.9999C8 20.4476 8.44772 19.9999 9 19.9999H11L11 17.6583C10.3741 17.8796 9.70073 18 9 18C5.68629 18 3 15.3137 3 12C3 9.72226 4.26904 7.74285 6.13553 6.72688Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('club', Club);
