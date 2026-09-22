import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TemperatureArrowUp: React.FC<IconComponentProps> = ({
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
        <><path d="M18 3V21M18 3L15 6M18 3L21 6M7 15.9998C6.44772 15.9998 6 16.4475 6 16.9998C6 17.5521 6.44772 17.9998 7 17.9998C7.55228 17.9998 8 17.5521 8 16.9998C8 16.4475 7.55228 15.9998 7 15.9998ZM7 15.9998V11.9998M7 16.9998L7.00707 17.0069M11 16.9998C11 19.209 9.20914 20.9998 7 20.9998C4.79086 20.9998 3 19.209 3 16.9998C3 15.9854 3.37764 15.0591 4 14.354L4 6C4 4.34315 5.34315 3 7 3C8.65685 3 10 4.34315 10 6V14.354C10.6224 15.0591 11 15.9854 11 16.9998Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M7 2C4.79086 2 3 3.79086 3 6V13.9995C2.37256 14.835 2 15.8748 2 16.9998C2 19.7613 4.23858 21.9998 7 21.9998C9.76142 21.9998 12 19.7613 12 16.9998C12 15.8748 11.6274 14.835 11 13.9995V6C11 3.79086 9.20914 2 7 2ZM8 11.9998C8 11.4475 7.55228 10.9998 7 10.9998C6.44772 10.9998 6 11.4475 6 11.9998V15.2674C5.4022 15.6132 5 16.2595 5 16.9998C5 18.1044 5.89543 18.9998 7 18.9998C8.10457 18.9998 9 18.1044 9 16.9998C9 16.2595 8.5978 15.6132 8 15.2674V11.9998Z" fill={color}/>
<path d="M18.7071 2.29289C18.3166 1.90237 17.6834 1.90237 17.2929 2.29289L14.2929 5.29289C13.9024 5.68342 13.9024 6.31658 14.2929 6.70711C14.6834 7.09763 15.3166 7.09763 15.7071 6.70711L17 5.41421V21C17 21.5523 17.4477 22 18 22C18.5523 22 19 21.5523 19 21V5.41421L20.2929 6.70711C20.6834 7.09763 21.3166 7.09763 21.7071 6.70711C22.0976 6.31658 22.0976 5.68342 21.7071 5.29289L18.7071 2.29289Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('temperature-arrow-up', TemperatureArrowUp);
