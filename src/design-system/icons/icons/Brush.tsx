import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Brush: React.FC<IconComponentProps> = ({
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
        <><path d="M9 3V7M15 3V6M4 10H20M12 21C10.2337 21 8.91561 19.3737 9.28133 17.6457L9.34332 17.3528C9.56076 16.3254 9.04388 15.2832 8.09439 14.8346L5.9897 13.8401C4.77487 13.2661 4 12.043 4 10.6994V4.63149C4 3.73044 4.73044 3 5.63149 3H18.3685C19.2696 3 20 3.73044 20 4.63149V10.6994C20 12.043 19.2251 13.2661 18.0103 13.8401L15.9056 14.8346C14.9561 15.2832 14.4392 16.3254 14.6567 17.3528L14.7187 17.6457C15.0844 19.3737 13.7663 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M3 4.63149C3 3.17816 4.17816 2 5.63149 2H18.3685C19.8218 2 21 3.17816 21 4.63149V10.6994C21 12.4298 20.0021 14.005 18.4375 14.7443L16.3328 15.7388C15.8023 15.9894 15.5135 16.5717 15.635 17.1457L15.697 17.4387C16.1943 19.7885 14.4019 22 12 22C9.5981 22 7.80568 19.7885 8.303 17.4387L8.36499 17.1457C8.48648 16.5717 8.19768 15.9894 7.66718 15.7388L5.56249 14.7443C3.99793 14.005 3 12.4298 3 10.6994V4.63149ZM19 9H5V4.63149C5 4.28273 5.28273 4 5.63149 4H8V7C8 7.55228 8.44772 8 9 8C9.55228 8 10 7.55228 10 7V4H14V6C14 6.55228 14.4477 7 15 7C15.5523 7 16 6.55228 16 6V4H18.3685C18.7173 4 19 4.28273 19 4.63149V9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('brush', Brush);
