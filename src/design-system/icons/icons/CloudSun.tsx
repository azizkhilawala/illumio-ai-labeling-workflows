import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudSun: React.FC<IconComponentProps> = ({
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
        <><path d="M11.0947 8.02658C11.5476 5.73111 13.5717 4 16 4C18.7614 4 21 6.23858 21 9C21 11.0345 19.7849 12.7852 18.0408 13.5659M11.0947 8.02658C9.24194 8.21766 7.68947 9.4193 7 11C4.6 11.375 3 13.3144 3 15.4137C3 17.9466 5.14903 20 7.8 20L15 20C17.2091 20 19 18.2719 19 16.1402C19 15.1829 18.6388 14.2698 18.0408 13.5659M11.0947 8.02658C11.265 8.00902 11.4378 8 11.6127 8C14.2747 8 16.4504 9.99072 16.6 12.5C17.1583 12.7354 17.6501 13.106 18.0408 13.5659" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M22 9C22 10.2768 21.6011 11.4605 20.9213 12.4332C20.4894 11.7479 19.9417 11.1392 19.3036 10.6407C18.3328 7.31031 15.18 5 11.6126 5C11.5842 5 11.5557 5.00015 11.5273 5.00045C12.626 3.77269 14.2227 3 16 3C19.3137 3 22 5.68629 22 9Z" fill={color}/>
<path d="M6.32159 10.1171C7.32966 8.29155 9.31942 7 11.6127 7C14.5626 7 17.0685 9.06974 17.5317 11.8502C19.0163 12.7158 20 14.3637 20 16.1402C20 18.8575 17.7275 21 15 21L7.8 21C4.64015 21 2 18.5413 2 15.4137C2 12.9593 3.74492 10.7512 6.32159 10.1171Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-sun', CloudSun);
