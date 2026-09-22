import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ImagePortrait: React.FC<IconComponentProps> = ({
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
        <><path d="M15 15.5C14.7164 14.3589 13.481 13.5 12 13.5C10.519 13.5 9.28364 14.3589 9 15.5M12 9.5H12.01M13 9.5C13 10.0523 12.5523 10.5 12 10.5C11.4477 10.5 11 10.0523 11 9.5C11 8.94772 11.4477 8.5 12 8.5C12.5523 8.5 13 8.94772 13 9.5ZM7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803ZM12 7.5C10.8954 7.5 10 8.39543 10 9.5C10 10.6046 10.8954 11.5 12 11.5C13.1046 11.5 14 10.6046 14 9.5C14 8.39543 13.1046 7.5 12 7.5ZM8.05529 15.8345C8.37281 13.942 10.017 12.5 12 12.5C13.983 12.5 15.6273 13.942 15.9448 15.8345C15.9934 16.1246 15.9119 16.4214 15.7219 16.646C15.5319 16.8705 15.2527 17 14.9586 17H9.04151C8.74737 17 8.46815 16.8705 8.27815 16.646C8.08814 16.4214 8.00663 16.1246 8.05529 15.8345Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('image-portrait', ImagePortrait);
