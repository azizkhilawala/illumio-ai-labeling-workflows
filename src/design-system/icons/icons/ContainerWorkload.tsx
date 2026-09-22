import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ContainerWorkload: React.FC<IconComponentProps> = ({
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
<path d="M9 14.3333L4.37957 11.6666V6.33329L9 3.66663L13.6204 6.33329V11.6666L9 14.3333Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('container-workload', ContainerWorkload);
