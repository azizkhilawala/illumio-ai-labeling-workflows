import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ShieldAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M20 6C20 6 19.1843 6 19.0001 6C16.2681 6 13.8871 4.93485 11.9999 3C10.1128 4.93478 7.73199 6 5.00009 6C4.81589 6 4.00009 6 4.00009 6C4.00009 6 4 8 4 9.16611C4 14.8596 7.3994 19.6436 12 21C16.6006 19.6436 20 14.8596 20 9.16611C20 8 20 6 20 6Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.7158 2.30177C12.5276 2.10882 12.2695 2 11.9999 2C11.7304 2 11.4723 2.10881 11.2841 2.30176C9.57493 4.05407 7.44816 5 5.00009 5H4.0001C3.44784 5 3.00012 5.44805 3.00009 6.00032L3 9.16611C3 15.2332 6.62798 20.4587 11.7172 21.9592C11.9018 22.0136 12.0982 22.0136 12.2828 21.9592C17.372 20.4587 21 15.2332 21 9.16611V6C21 5.44772 20.5514 5 19.9991 5H19.0001C16.5519 5 14.4249 4.05411 12.7158 2.30177Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('shield-alt', ShieldAlt);
