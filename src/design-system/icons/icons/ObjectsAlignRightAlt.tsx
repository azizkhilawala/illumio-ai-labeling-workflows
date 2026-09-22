import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignRightAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M20 4V20M12.8 16H7.2C6.0799 16 5.51984 16 5.09202 15.782C4.71569 15.5903 4.40973 15.2843 4.21799 14.908C4 14.4802 4 13.9201 4 12.8V11.2C4 10.0799 4 9.51984 4.21799 9.09202C4.40973 8.71569 4.71569 8.40973 5.09202 8.21799C5.51984 8 6.07989 8 7.2 8H12.8C13.9201 8 14.4802 8 14.908 8.21799C15.2843 8.40973 15.5903 8.71569 15.782 9.09202C16 9.51984 16 10.0799 16 11.2V12.8C16 13.9201 16 14.4802 15.782 14.908C15.5903 15.2843 15.2843 15.5903 14.908 15.782C14.4802 16 13.9201 16 12.8 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M20 3C19.4477 3 19 3.44772 19 4V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z" fill={color}/>
<path d="M3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V12.2C3 13.8802 3 14.7202 3.32698 15.362C3.6146 15.9265 4.07354 16.3854 4.63803 16.673C5.27976 17 6.11984 17 7.8 17H12.2C13.8802 17 14.7202 17 15.362 16.673C15.9265 16.3854 16.3854 15.9265 16.673 15.362C17 14.7202 17 13.8802 17 12.2V11.8C17 10.1198 17 9.27976 16.673 8.63803C16.3854 8.07354 15.9265 7.6146 15.362 7.32698C14.7202 7 13.8802 7 12.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-right-alt', ObjectsAlignRightAlt);
