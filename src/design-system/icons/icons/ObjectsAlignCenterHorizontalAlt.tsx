import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignCenterHorizontalAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M12 8V4M12 20V16M7.2 16H16.8C17.9201 16 18.4802 16 18.908 15.782C19.2843 15.5903 19.5903 15.2843 19.782 14.908C20 14.4802 20 13.9201 20 12.8V11.2C20 10.0799 20 9.51984 19.782 9.09202C19.5903 8.71569 19.2843 8.40973 18.908 8.21799C18.4802 8 17.9201 8 16.8 8H7.2C6.0799 8 5.51984 8 5.09202 8.21799C4.71569 8.40973 4.40973 8.71569 4.21799 9.09202C4 9.51984 4 10.0799 4 11.2V12.8C4 13.9201 4 14.4802 4.21799 14.908C4.40973 15.2843 4.71569 15.5903 5.09202 15.782C5.51984 16 6.07989 16 7.2 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 3C11.4477 3 11 3.44772 11 4V7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V12.2C3 13.8802 3 14.7202 3.32698 15.362C3.6146 15.9265 4.07354 16.3854 4.63803 16.673C5.27976 17 6.11984 17 7.8 17H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V17H16.2C17.8802 17 18.7202 17 19.362 16.673C19.9265 16.3854 20.3854 15.9265 20.673 15.362C21 14.7202 21 13.8802 21 12.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H13V4C13 3.44772 12.5523 3 12 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-center-horizontal-alt', ObjectsAlignCenterHorizontalAlt);
