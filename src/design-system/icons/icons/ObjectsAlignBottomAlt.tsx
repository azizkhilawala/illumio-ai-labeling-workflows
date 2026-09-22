import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignBottomAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M4 20H20M11.2 16H12.8C13.9201 16 14.4802 16 14.908 15.782C15.2843 15.5903 15.5903 15.2843 15.782 14.908C16 14.4802 16 13.9201 16 12.8V7.2C16 6.0799 16 5.51984 15.782 5.09202C15.5903 4.71569 15.2843 4.40973 14.908 4.21799C14.4802 4 13.9201 4 12.8 4H11.2C10.0799 4 9.51984 4 9.09202 4.21799C8.71569 4.40973 8.40973 4.71569 8.21799 5.09202C8 5.51984 8 6.07989 8 7.2V12.8C8 13.9201 8 14.4802 8.21799 14.908C8.40973 15.2843 8.71569 15.5903 9.09202 15.782C9.51984 16 10.0799 16 11.2 16Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M7.32698 4.63803C7 5.27976 7 6.11984 7 7.8V12.2C7 13.8802 7 14.7202 7.32698 15.362C7.6146 15.9265 8.07354 16.3854 8.63803 16.673C9.27976 17 10.1198 17 11.8 17H12.2C13.8802 17 14.7202 17 15.362 16.673C15.9265 16.3854 16.3854 15.9265 16.673 15.362C17 14.7202 17 13.8802 17 12.2V7.8C17 6.11984 17 5.27976 16.673 4.63803C16.3854 4.07354 15.9265 3.6146 15.362 3.32698C14.7202 3 13.8802 3 12.2 3H11.8C10.1198 3 9.27976 3 8.63803 3.32698C8.07354 3.6146 7.6146 4.07354 7.32698 4.63803Z" fill={color}/>
<path d="M4 19C3.44772 19 3 19.4477 3 20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20C21 19.4477 20.5523 19 20 19H4Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-bottom-alt', ObjectsAlignBottomAlt);
