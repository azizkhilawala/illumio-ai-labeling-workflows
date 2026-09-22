import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MoneyCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M7 14H17M7 10H17M6.2 18H17.8C18.9201 18 19.4802 18 19.908 17.782C20.2843 17.5903 20.5903 17.2843 20.782 16.908C21 16.4802 21 15.9201 21 14.8V9.2C21 8.07989 21 7.51984 20.782 7.09202C20.5903 6.71569 20.2843 6.40973 19.908 6.21799C19.4802 6 18.9201 6 17.8 6H6.2C5.0799 6 4.51984 6 4.09202 6.21799C3.71569 6.40973 3.40973 6.71569 3.21799 7.09202C3 7.51984 3 8.07989 3 9.2V14.8C3 15.9201 3 16.4802 3.21799 16.908C3.40973 17.2843 3.71569 17.5903 4.09202 17.782C4.51984 18 5.07989 18 6.2 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.32698 6.63803C2 7.27976 2 8.11984 2 9.8V14.2C2 15.8802 2 16.7202 2.32698 17.362C2.6146 17.9265 3.07354 18.3854 3.63803 18.673C4.27976 19 5.11984 19 6.8 19H17.2C18.8802 19 19.7202 19 20.362 18.673C20.9265 18.3854 21.3854 17.9265 21.673 17.362C22 16.7202 22 15.8802 22 14.2V9.8C22 8.11984 22 7.27976 21.673 6.63803C21.3854 6.07354 20.9265 5.6146 20.362 5.32698C19.7202 5 18.8802 5 17.2 5H6.8C5.11984 5 4.27976 5 3.63803 5.32698C3.07354 5.6146 2.6146 6.07354 2.32698 6.63803ZM6 10C6 9.44772 6.44772 9 7 9H17C17.5523 9 18 9.44772 18 10C18 10.5523 17.5523 11 17 11H7C6.44771 11 6 10.5523 6 10ZM6 14C6 13.4477 6.44772 13 7 13H17C17.5523 13 18 13.4477 18 14C18 14.5523 17.5523 15 17 15H7C6.44771 15 6 14.5523 6 14Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('money-check', MoneyCheck);
