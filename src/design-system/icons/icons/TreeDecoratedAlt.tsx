import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const TreeDecoratedAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M19 17H5L12 2L19 17ZM19 17L8 11M16 11.5L9.5 8M9 22H15M12 22V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.9062 1.57711C12.7419 1.22504 12.3885 1 12 1C11.6115 1 11.2581 1.22504 11.0938 1.57711L8.83369 6.42024L17.2357 10.8546L12.9062 1.57711Z" fill={color}/>
<path d="M18.6359 13.8551L7.9869 8.23479L7.40515 9.48141L19.768 16.281L18.6359 13.8551Z" fill={color}/>
<path d="M18.7434 18L6.55752 11.2978L4.09382 16.5771C3.94929 16.8868 3.97294 17.2489 4.15653 17.5372C4.34012 17.8255 4.65823 18 5 18H11V21H9C8.44772 21 8 21.4477 8 22C8 22.5523 8.44772 23 9 23H15C15.5523 23 16 22.5523 16 22C16 21.4477 15.5523 21 15 21H13V18H18.7434Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('tree-decorated-alt', TreeDecoratedAlt);
