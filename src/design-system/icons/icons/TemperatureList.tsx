import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TemperatureList: React.FC<IconComponentProps> = ({
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
        <><path d="M15 4H20M15 8H20M17 12H20M8 15.9998C7.44772 15.9998 7 16.4475 7 16.9998C7 17.5521 7.44772 17.9998 8 17.9998C8.55228 17.9998 9 17.5521 9 16.9998C9 16.4475 8.55228 15.9998 8 15.9998ZM8 15.9998V9M8 16.9998L8.00707 17.0069M12 16.9998C12 19.209 10.2091 20.9998 8 20.9998C5.79086 20.9998 4 19.209 4 16.9998C4 15.9854 4.37764 15.0591 5 14.354L5 6C5 4.34315 6.34315 3 8 3C9.65685 3 11 4.34315 11 6V14.354C11.6224 15.0591 12 15.9854 12 16.9998Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8 2C5.79086 2 4 3.79086 4 6V13.9995C3.37256 14.835 3 15.8748 3 16.9998C3 19.7613 5.23858 21.9998 8 21.9998C10.7614 21.9998 13 19.7613 13 16.9998C13 15.8748 12.6274 14.835 12 13.9995V6C12 3.79086 10.2091 2 8 2ZM9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9V15.2674C6.4022 15.6132 6 16.2595 6 16.9998C6 18.1044 6.89543 18.9998 8 18.9998C9.10457 18.9998 10 18.1044 10 16.9998C10 16.2595 9.5978 15.6132 9 15.2674V9Z" fill={color}/>
<path d="M15 3C14.4477 3 14 3.44772 14 4C14 4.55228 14.4477 5 15 5H20C20.5523 5 21 4.55228 21 4C21 3.44772 20.5523 3 20 3H15Z" fill={color}/>
<path d="M15 7C14.4477 7 14 7.44772 14 8C14 8.55228 14.4477 9 15 9H20C20.5523 9 21 8.55228 21 8C21 7.44772 20.5523 7 20 7H15Z" fill={color}/>
<path d="M17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('temperature-list', TemperatureList);
