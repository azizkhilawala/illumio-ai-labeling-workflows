import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TemperatureEmpty: React.FC<IconComponentProps> = ({
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
        <><path d="M12 16.9998L12.0071 17.0069M16 16.9998C16 19.209 14.2091 20.9998 12 20.9998C9.79086 20.9998 8 19.209 8 16.9998C8 15.9854 8.37764 15.0591 9 14.354L9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V14.354C15.6224 15.0591 16 15.9854 16 16.9998ZM13 16.9998C13 17.5521 12.5523 17.9998 12 17.9998C11.4477 17.9998 11 17.5521 11 16.9998C11 16.4475 11.4477 15.9998 12 15.9998C12.5523 15.9998 13 16.4475 13 16.9998Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.79086 2 8 3.79086 8 6V13.9995C7.37256 14.835 7 15.8748 7 16.9998C7 19.7613 9.23858 21.9998 12 21.9998C14.7614 21.9998 17 19.7613 17 16.9998C17 15.8748 16.6274 14.835 16 13.9995V6C16 3.79086 14.2091 2 12 2ZM12 14.9998C10.8954 14.9998 10 15.8952 10 16.9998C10 18.1044 10.8954 18.9998 12 18.9998C13.1046 18.9998 14 18.1044 14 16.9998C14 15.8952 13.1046 14.9998 12 14.9998Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('temperature-empty', TemperatureEmpty);
