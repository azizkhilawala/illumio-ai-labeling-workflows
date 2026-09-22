import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MouseAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 9V3M12 3C15.3137 3 18 5.68629 18 9V15C18 18.3137 15.3137 21 12 21C8.68629 21 6 18.3137 6 15V9C6 5.68629 8.68629 3 12 3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9V15C5 18.866 8.13401 22 12 22C15.866 22 19 18.866 19 15V9C19 5.13401 15.866 2 12 2ZM13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9V5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('mouse-alt', MouseAlt);
