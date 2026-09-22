import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const AustralSign: React.FC<IconComponentProps> = ({
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
        <><path d="M5 21L12 3L19 21M19 15H5M19 11H5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.0003 2C12.4127 2 12.7828 2.25318 12.9323 2.63755L15.7954 10H19.0003C19.5526 10 20.0003 10.4477 20.0003 11C20.0003 11.5523 19.5526 12 19.0003 12H16.5732L17.351 14H19.0003C19.5526 14 20.0003 14.4477 20.0003 15C20.0003 15.5523 19.5526 16 19.0003 16H18.1288L19.9323 20.6376C20.1324 21.1523 19.8774 21.7318 19.3627 21.932C18.848 22.1322 18.2684 21.8772 18.0683 21.3624L15.9829 16H8.01767L5.93227 21.3624C5.7321 21.8772 5.15255 22.1322 4.63782 21.932C4.12309 21.7318 3.86809 21.1523 4.06826 20.6376L5.87176 16H5.00027C4.44798 16 4.00027 15.5523 4.00027 15C4.00027 14.4477 4.44798 14 5.00027 14H6.64953L7.42731 12H5.00027C4.44798 12 4.00027 11.5523 4.00027 11C4.00027 10.4477 4.44798 10 5.00027 10H8.20509L11.0683 2.63755C11.2177 2.25318 11.5879 2 12.0003 2ZM9.57322 12L8.79545 14H15.2051L14.4273 12H9.57322ZM13.6495 10H10.351L12.0003 5.75903L13.6495 10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('austral-sign', AustralSign);
