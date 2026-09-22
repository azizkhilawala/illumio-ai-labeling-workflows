import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ObjectsAlignCenterVerticalAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M8 12H4M20 12H16M11.2 20H12.8C13.9201 20 14.4802 20 14.908 19.782C15.2843 19.5903 15.5903 19.2843 15.782 18.908C16 18.4802 16 17.9201 16 16.8V7.2C16 6.0799 16 5.51984 15.782 5.09202C15.5903 4.71569 15.2843 4.40973 14.908 4.21799C14.4802 4 13.9201 4 12.8 4H11.2C10.0799 4 9.51984 4 9.09202 4.21799C8.71569 4.40973 8.40973 4.71569 8.21799 5.09202C8 5.51984 8 6.07989 8 7.2V16.8C8 17.9201 8 18.4802 8.21799 18.908C8.40973 19.2843 8.71569 19.5903 9.09202 19.782C9.51984 20 10.0799 20 11.2 20Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M7.32698 4.63803C7 5.27976 7 6.11984 7 7.8V11H4C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H7V16.2C7 17.8802 7 18.7202 7.32698 19.362C7.6146 19.9265 8.07354 20.3854 8.63803 20.673C9.27976 21 10.1198 21 11.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11H17V7.8C17 6.11984 17 5.27976 16.673 4.63803C16.3854 4.07354 15.9265 3.6146 15.362 3.32698C14.7202 3 13.8802 3 12.2 3H11.8C10.1198 3 9.27976 3 8.63803 3.32698C8.07354 3.6146 7.6146 4.07354 7.32698 4.63803Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('objects-align-center-vertical-alt', ObjectsAlignCenterVerticalAlt);
