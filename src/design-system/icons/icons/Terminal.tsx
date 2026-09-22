import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Terminal: React.FC<IconComponentProps> = ({
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
        <><path d="M12 19H21M3 5L11 12L3 19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.24744 4.34151C2.61112 3.92587 3.24288 3.88375 3.65852 4.24744L11.6585 11.2474C11.8755 11.4373 12 11.7117 12 12C12 12.2884 11.8755 12.5627 11.6585 12.7526L3.65852 19.7526C3.24288 20.1163 2.61112 20.0742 2.24744 19.6585C1.88375 19.2429 1.92587 18.6111 2.34151 18.2474L9.48142 12L2.34151 5.75259C1.92587 5.38891 1.88375 4.75715 2.24744 4.34151ZM11 19C11 18.4477 11.4477 18 12 18H21C21.5523 18 22 18.4477 22 19C22 19.5523 21.5523 20 21 20H12C11.4477 20 11 19.5523 11 19Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('terminal', Terminal);
