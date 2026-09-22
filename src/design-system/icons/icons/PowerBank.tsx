import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PowerBank: React.FC<IconComponentProps> = ({
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
        <><path d="M20 18V7.8C20 6.11984 20 5.27976 19.673 4.63803C19.3854 4.07354 18.9265 3.6146 18.362 3.32698C17.7202 3 16.8802 3 15.2 3H8.8C7.11984 3 6.27976 3 5.63803 3.32698C5.07354 3.6146 4.6146 4.07354 4.32698 4.63803C4 5.27976 4 6.11984 4 7.8V18M20 18C20 19.6569 18.6569 21 17 21H7C5.34315 21 4 19.6569 4 18M20 18C20 16.3431 18.6569 15 17 15H7C5.34315 15 4 16.3431 4 18M11.5 6.5L10.5 9H13.5L12.5 11.5M7 18H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M7 2C4.79086 2 3 3.79086 3 6V14.9995C3.91223 13.7853 5.3644 13 7 13H17C18.6356 13 20.0878 13.7853 21 14.9995V6C21 3.79086 19.2091 2 17 2H7ZM11.8714 4.07179C12.3842 4.2769 12.6336 4.85887 12.4285 5.37166L11.977 6.50027H13.5C13.8318 6.50027 14.142 6.66486 14.3281 6.93964C14.5141 7.21441 14.5517 7.56357 14.4285 7.87166L13.4285 10.3717C13.2234 10.8844 12.6414 11.1339 12.1286 10.9287C11.6158 10.7236 11.3664 10.1417 11.5715 9.62888L12.023 8.50027H10.5C10.1682 8.50027 9.85797 8.33567 9.67194 8.06089C9.48591 7.78612 9.44829 7.43697 9.57153 7.12888L10.5715 4.62888C10.7766 4.11609 11.3586 3.86668 11.8714 4.07179Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M3 18C3 15.7909 4.79086 14 7 14H17C19.2091 14 21 15.7909 21 18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18ZM6 18C6 17.4477 6.44772 17 7 17H9C9.55229 17 10 17.4477 10 18C10 18.5523 9.55229 19 9 19H7C6.44772 19 6 18.5523 6 18Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('power-bank', PowerBank);
