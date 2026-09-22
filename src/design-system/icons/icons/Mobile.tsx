import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Mobile: React.FC<IconComponentProps> = ({
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
        <><path d="M12 18H12.01M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M5.32698 3.63803C5 4.27976 5 5.11984 5 6.8V17.2C5 18.8802 5 19.7202 5.32698 20.362C5.6146 20.9265 6.07354 21.3854 6.63803 21.673C7.27976 22 8.11984 22 9.8 22H14.2C15.8802 22 16.7202 22 17.362 21.673C17.9265 21.3854 18.3854 20.9265 18.673 20.362C19 19.7202 19 18.8802 19 17.2V6.8C19 5.11984 19 4.27976 18.673 3.63803C18.3854 3.07354 17.9265 2.6146 17.362 2.32698C16.7202 2 15.8802 2 14.2 2H9.8C8.11984 2 7.27976 2 6.63803 2.32698C6.07354 2.6146 5.6146 3.07354 5.32698 3.63803ZM13 19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mobile', Mobile);
