import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.0004 2C9.23894 2 7.00036 4.23858 7.00036 7C7.00036 9.76142 9.23894 12 12.0004 12C14.7618 12 17.0004 9.76142 17.0004 7C17.0004 4.23858 14.7618 2 12.0004 2Z" fill={color}/>
<path d="M12.0004 13C15.5854 13 18.6809 15.0961 20.128 18.1297C20.4453 18.7949 20.604 19.1275 20.48 19.8975C20.3961 20.4187 19.8675 21.2564 19.4332 21.5566C18.7917 22 18.1946 22 17.0004 22H7.00036C5.80615 22 5.20904 22 4.56748 21.5566C4.13318 21.2564 3.60465 20.4187 3.52072 19.8975C3.39673 19.1275 3.5554 18.7949 3.87272 18.1297C5.31986 15.0961 8.41532 13 12.0004 13Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-alt-1', UserAlt1);
