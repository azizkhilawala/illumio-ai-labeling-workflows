import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Landmark: React.FC<IconComponentProps> = ({
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
        <><path d="M3 21H21M3 18H21M6 18.0001V13.0001M10 18.0001V13.0001M14 18.0001V13.0001M18 18.0001V13.0001M21 9.99999L14.126 3.88974C13.3737 3.22108 12.9976 2.88675 12.5732 2.75979C12.1992 2.64794 11.8008 2.64794 11.4268 2.75979C11.0024 2.88675 10.6263 3.22108 9.87404 3.88974L3 9.99999H21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11.1403 1.80186C11.7012 1.63408 12.2989 1.63408 12.8598 1.80186C13.2328 1.91343 13.5423 2.10585 13.8313 2.32525C14.1036 2.53193 14.4104 2.80463 14.7636 3.11866L21.6644 9.25271C21.9747 9.52854 22.0823 9.96742 21.9348 10.3555C21.789 10.7388 21.4243 10.9938 21.0153 11H2.9848C2.57578 10.9938 2.21106 10.7388 2.06532 10.3555C1.91777 9.96742 2.02537 9.52854 2.33568 9.25271L9.23649 3.11865C9.58974 2.80463 9.89651 2.53192 10.1688 2.32525C10.4578 2.10585 10.7673 1.91343 11.1403 1.80186Z" fill={color}/>
<path d="M5 13V17H4C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18C21 17.4477 20.5523 17 20 17H19V13H17V17H15V13H13V17H11V13H9V17H7V13H5Z" fill={color}/>
<path d="M2 21C2 20.4477 2.44772 20 3 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('landmark', Landmark);
