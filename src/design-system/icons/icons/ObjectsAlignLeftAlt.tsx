import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignLeftAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M4 4V20M11.2 16H16.8C17.9201 16 18.4802 16 18.908 15.782C19.2843 15.5903 19.5903 15.2843 19.782 14.908C20 14.4802 20 13.9201 20 12.8V11.2C20 10.0799 20 9.51984 19.782 9.09202C19.5903 8.71569 19.2843 8.40973 18.908 8.21799C18.4802 8 17.9201 8 16.8 8H11.2C10.0799 8 9.51984 8 9.09202 8.21799C8.71569 8.40973 8.40973 8.71569 8.21799 9.09202C8 9.51984 8 10.0799 8 11.2V12.8C8 13.9201 8 14.4802 8.21799 14.908C8.40973 15.2843 8.71569 15.5903 9.09202 15.782C9.51984 16 10.0799 16 11.2 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20V4C5 3.44772 4.55228 3 4 3Z" fill={color}/>
<path d="M7.32698 8.63803C7 9.27976 7 10.1198 7 11.8V12.2C7 13.8802 7 14.7202 7.32698 15.362C7.6146 15.9265 8.07354 16.3854 8.63803 16.673C9.27976 17 10.1198 17 11.8 17H16.2C17.8802 17 18.7202 17 19.362 16.673C19.9265 16.3854 20.3854 15.9265 20.673 15.362C21 14.7202 21 13.8802 21 12.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H11.8C10.1198 7 9.27976 7 8.63803 7.32698C8.07354 7.6146 7.6146 8.07354 7.32698 8.63803Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-left-alt', ObjectsAlignLeftAlt);
