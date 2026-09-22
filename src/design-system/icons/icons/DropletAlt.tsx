import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DropletAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 21.5C13.8565 21.5 15.637 20.7625 16.9497 19.4497C18.2625 18.137 19 16.3565 19 14.5C19 12.5 18 10.6 16 9C14 7.4 12.5 5 12 2.5C11.5 5 10 7.4 8 9C6 10.6 5 12.5 5 14.5C5 16.3565 5.7375 18.137 7.05025 19.4497C8.36301 20.7625 10.1435 21.5 12 21.5V21.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.9806 2.30388C12.8871 1.83646 12.4767 1.5 12 1.5C11.5233 1.5 11.1129 1.83646 11.0194 2.30388C10.5674 4.56378 9.19919 6.76002 7.3753 8.21913C5.19568 9.96283 4 12.1294 4 14.5C4 16.6217 4.84285 18.6566 6.34315 20.1569C7.84344 21.6571 9.87827 22.5 12 22.5C14.1217 22.5 16.1566 21.6571 17.6569 20.1569C19.1571 18.6566 20 16.6217 20 14.5C20 12.1294 18.8043 9.96283 16.6247 8.21913C14.8008 6.76002 13.4326 4.56378 12.9806 2.30388Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('droplet-alt', DropletAlt);
