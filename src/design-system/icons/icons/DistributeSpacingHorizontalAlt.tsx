import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const DistributeSpacingHorizontalAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M4 4V20M20 4V20M12.8 20H11.2C10.0799 20 9.51984 20 9.09202 19.782C8.71569 19.5903 8.40973 19.2843 8.21799 18.908C8 18.4802 8 17.9201 8 16.8V7.2C8 6.0799 8 5.51984 8.21799 5.09202C8.40973 4.71569 8.71569 4.40973 9.09202 4.21799C9.51984 4 10.0799 4 11.2 4H12.8C13.9201 4 14.4802 4 14.908 4.21799C15.2843 4.40973 15.5903 4.71569 15.782 5.09202C16 5.51984 16 6.07989 16 7.2V16.8C16 17.9201 16 18.4802 15.782 18.908C15.5903 19.2843 15.2843 19.5903 14.908 19.782C14.4802 20 13.9201 20 12.8 20Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M5 4C5 3.44772 4.55228 3 4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21C4.55228 21 5 20.5523 5 20V4Z" fill={color}/>
<path d="M21 4C21 3.44772 20.5523 3 20 3C19.4477 3 19 3.44772 19 4V20C19 20.5523 19.4477 21 20 21C20.5523 21 21 20.5523 21 20V4Z" fill={color}/>
<path d="M7.32698 4.63803C7 5.27976 7 6.11984 7 7.8V16.2C7 17.8802 7 18.7202 7.32698 19.362C7.6146 19.9265 8.07354 20.3854 8.63803 20.673C9.27976 21 10.1198 21 11.8 21H12.2C13.8802 21 14.7202 21 15.362 20.673C15.9265 20.3854 16.3854 19.9265 16.673 19.362C17 18.7202 17 17.8802 17 16.2V7.8C17 6.11984 17 5.27976 16.673 4.63803C16.3854 4.07354 15.9265 3.6146 15.362 3.32698C14.7202 3 13.8802 3 12.2 3H11.8C10.1198 3 9.27976 3 8.63803 3.32698C8.07354 3.6146 7.6146 4.07354 7.32698 4.63803Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('distribute-spacing-horizontal-alt', DistributeSpacingHorizontalAlt);
