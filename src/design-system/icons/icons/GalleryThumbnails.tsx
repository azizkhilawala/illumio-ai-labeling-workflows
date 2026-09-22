import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const GalleryThumbnails: React.FC<IconComponentProps> = ({
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
        <><path d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V10.8C21 11.9201 21 12.4802 20.782 12.908C20.5903 13.2843 20.2843 13.5903 19.908 13.782C19.4802 14 18.9201 14 17.8 14H6.2C5.07989 14 4.51984 14 4.09202 13.782C3.71569 13.5903 3.40973 13.2843 3.21799 12.908C3 12.4802 3 11.9201 3 10.8V8.2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 18H10V19H9V18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14 18H15V19H14V18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19 18H20V19H19V18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4 18H5V19H4V18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2 18C2 17.4477 2.44772 17 3 17H4C4.55228 17 5 17.4477 5 18V19C5 19.5523 4.55228 20 4 20H3C2.44772 20 2 19.5523 2 19V18ZM7.5 18C7.5 17.4477 7.94772 17 8.5 17H9.5C10.0523 17 10.5 17.4477 10.5 18V19C10.5 19.5523 10.0523 20 9.5 20H8.5C7.94772 20 7.5 19.5523 7.5 19V18ZM13.5 18C13.5 17.4477 13.9477 17 14.5 17H15.5C16.0523 17 16.5 17.4477 16.5 18V19C16.5 19.5523 16.0523 20 15.5 20H14.5C13.9477 20 13.5 19.5523 13.5 19V18ZM19 18C19 17.4477 19.4477 17 20 17H21C21.5523 17 22 17.4477 22 18V19C22 19.5523 21.5523 20 21 20H20C19.4477 20 19 19.5523 19 19V18Z" fill={color}/>
<path d="M2 7.2C2 6.0799 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.71569 4.40973 3.09202 4.21799C3.51984 4 4.0799 4 5.2 4H18.8C19.9201 4 20.4802 4 20.908 4.21799C21.2843 4.40973 21.5903 4.71569 21.782 5.09202C22 5.51984 22 6.0799 22 7.2V11.8C22 12.9201 22 13.4802 21.782 13.908C21.5903 14.2843 21.2843 14.5903 20.908 14.782C20.4802 15 19.9201 15 18.8 15H5.2C4.0799 15 3.51984 15 3.09202 14.782C2.71569 14.5903 2.40973 14.2843 2.21799 13.908C2 13.4802 2 12.9201 2 11.8V7.2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('gallery-thumbnails', GalleryThumbnails);
