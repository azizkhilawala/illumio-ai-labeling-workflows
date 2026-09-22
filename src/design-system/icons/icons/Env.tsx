import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Env: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M10.72 9.71996L13.4433 12.89H10.39V14.3333H7.89V12.8933H4.55667L7.58334 9.72329H5.39L8.49 6.55329H6.49L9.27667 3.66663L11.7767 6.54996H10.11L12.9 9.71996H10.72Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('env', Env);
