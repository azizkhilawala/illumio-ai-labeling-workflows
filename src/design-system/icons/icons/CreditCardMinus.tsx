import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CreditCardMinus: React.FC<IconComponentProps> = ({
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
        <><path d="M12 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V14M3 9H21M21 18.0007L16 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M2.00169 8H21.9983C21.9902 6.83507 21.9434 6.16873 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2.05658 6.16873 2.00979 6.83507 2.00169 8Z" fill={color}/>
<path d="M22 10H2V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20H13.7639C13.2889 19.4692 13 18.7684 13 18C13 16.3431 14.3431 15 16 15H22V10Z" fill={color}/>
<path d="M16.0001 17C15.4479 16.9999 15.0001 17.4476 15 17.9999C14.9999 18.5521 15.4476 18.9999 15.9999 19L20.9999 19.0007C21.5521 19.0008 21.9999 18.5531 22 18.0008C22.0001 17.4485 21.5524 17.0008 21.0001 17.0007L16.0001 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('credit-card-minus', CreditCardMinus);
