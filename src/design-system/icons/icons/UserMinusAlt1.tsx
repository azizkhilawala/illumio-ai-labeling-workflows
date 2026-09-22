import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const UserMinusAlt1: React.FC<IconComponentProps> = ({
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
        <><path d="M4 21C4 17.134 7.13401 14 11 14C11.695 14 12.3663 14.1013 13 14.2899M20 18L14 18M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.5218 2C8.76042 2 6.52185 4.23858 6.52185 7C6.52185 9.76142 8.76042 12 11.5218 12C14.2833 12 16.5218 9.76142 16.5218 7C16.5218 4.23858 14.2833 2 11.5218 2Z" fill={color}/>
<path d="M11.5218 13C13.6651 13 15.6335 13.7492 17.1792 15H14C12.3431 15 11 16.3431 11 18C11 19.6569 12.3431 21 14 21H19.4816C19.3135 21.2345 19.1267 21.4377 18.9547 21.5566C18.3132 22 17.7161 22 16.5218 22H6.52185C5.32763 22 4.73052 22 4.08897 21.5566C3.65466 21.2564 3.12614 20.4187 3.0422 19.8975C2.91822 19.1275 3.07688 18.7949 3.39421 18.1297C4.84134 15.0961 7.9368 13 11.5218 13Z" fill={color}/>
<path d="M14 17C13.4477 17 13 17.4477 13 18C13 18.5523 13.4477 19 14 19L20 19C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17L14 17Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('user-minus-alt-1', UserMinusAlt1);
