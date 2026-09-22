import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignTopAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M4 4H20M11.2 8H12.8C13.9201 8 14.4802 8 14.908 8.21799C15.2843 8.40973 15.5903 8.71569 15.782 9.09202C16 9.51984 16 10.0799 16 11.2V16.8C16 17.9201 16 18.4802 15.782 18.908C15.5903 19.2843 15.2843 19.5903 14.908 19.782C14.4802 20 13.9201 20 12.8 20H11.2C10.0799 20 9.51984 20 9.09202 19.782C8.71569 19.5903 8.40973 19.2843 8.21799 18.908C8 18.4802 8 17.9201 8 16.8V11.2C8 10.0799 8 9.51984 8.21799 9.09202C8.40973 8.71569 8.71569 8.40973 9.09202 8.21799C9.51984 8 10.0799 8 11.2 8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M4 3C3.44772 3 3 3.44772 3 4C3 4.55228 3.44772 5 4 5H20C20.5523 5 21 4.55228 21 4C21 3.44772 20.5523 3 20 3H4Z" fill={color}/>
<path d="M7.32698 8.63803C7 9.27976 7 10.1198 7 11.8V16.2C7 17.8802 7 18.7202 7.32698 19.362C7.6146 19.9265 8.07354 20.3854 8.63803 20.673C9.27976 21 10.1198 21 11.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V11.8C17 10.1198 17 9.27976 16.673 8.63803C16.3854 8.07354 15.9265 7.6146 15.362 7.32698C14.7202 7 13.8802 7 12.2 7H11.8C10.1198 7 9.27976 7 8.63803 7.32698C8.07354 7.6146 7.6146 8.07354 7.32698 8.63803Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-top-alt', ObjectsAlignTopAlt);
