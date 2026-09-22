import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const BracketsRound: React.FC<IconComponentProps> = ({
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
        <><path d="M8.61914 3C6.37761 5.33579 5 8.50702 5 12C5 15.493 6.37761 18.6642 8.61914 21M15.3809 3C17.6224 5.33579 19 8.50702 19 12C19 15.493 17.6224 18.6642 15.3809 21" stroke={color} strokeWidth="2" strokeLinecap="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M9.31154 2.27849C9.71003 2.66089 9.72306 3.29392 9.34066 3.6924C7.27064 5.84946 6 8.77529 6 12C6 15.2247 7.27064 18.1505 9.34066 20.3076C9.72306 20.7061 9.71003 21.3391 9.31154 21.7215C8.91306 22.1039 8.28003 22.0909 7.89763 21.6924C5.48457 19.1779 4 15.7613 4 12C4 8.23874 5.48457 4.82212 7.89763 2.3076C8.28003 1.90912 8.91306 1.89609 9.31154 2.27849ZM14.6885 2.27849C15.0869 1.89609 15.72 1.90912 16.1024 2.3076C18.5154 4.82212 20 8.23874 20 12C20 15.7613 18.5154 19.1779 16.1024 21.6924C15.72 22.0909 15.0869 22.1039 14.6885 21.7215C14.29 21.3391 14.2769 20.7061 14.6593 20.3076C16.7294 18.1505 18 15.2247 18 12C18 8.77529 16.7294 5.84946 14.6593 3.6924C14.2769 3.29392 14.29 2.66089 14.6885 2.27849Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('brackets-round', BracketsRound);
