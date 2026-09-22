import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const KitMedical: React.FC<IconComponentProps> = ({
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
        <><path d="M10 12H14M12 10V14M7 5V19M17 5V19M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M16 4H8V20H16V4ZM12 9C11.4477 9 11 9.44772 11 10V11H10C9.44772 11 9 11.4477 9 12C9 12.5523 9.44772 13 10 13H11V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V13H14C14.5523 13 15 12.5523 15 12C15 11.4477 14.5523 11 14 11H13V10C13 9.44772 12.5523 9 12 9Z" fill={color}/>
<path d="M18 19.9983V4.00169C19.1649 4.00979 19.8313 4.05658 20.362 4.32698C20.9265 4.6146 21.3854 5.07354 21.673 5.63803C22 6.27976 22 7.11984 22 8.8V15.2C22 16.8802 22 17.7202 21.673 18.362C21.3854 18.9265 20.9265 19.3854 20.362 19.673C19.8313 19.9434 19.1649 19.9902 18 19.9983Z" fill={color}/>
<path d="M6 19.9983V4.00169C4.83507 4.00979 4.16873 4.05658 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.16873 19.9434 4.83507 19.9902 6 19.9983Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('kit-medical', KitMedical);
