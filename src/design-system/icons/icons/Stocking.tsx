import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Stocking: React.FC<IconComponentProps> = ({
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
        <><path d="M17.9994 7V13.9082C17.9994 15.8165 16.9648 17.5748 15.2967 18.5015L11.2011 20.7768C9.87422 21.514 8.23058 21.3593 7.06447 20.3876C5.09587 18.7471 5.36884 15.646 7.59375 14.3747L9.99939 13L9.99939 7M8.99939 3H18.9994V7H8.99939V3Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.99945 2C8.44716 2 7.99945 2.44772 7.99945 3V7C7.99945 7.55228 8.44716 8 8.99945 8H18.9994C19.5517 8 19.9994 7.55228 19.9994 7V3C19.9994 2.44772 19.5517 2 18.9994 2H8.99945Z" fill={color}/>
<path d="M18.9994 9C12.3328 9 15.6661 9 8.99945 9L8.99945 12.4197L7.09766 13.5064C4.26723 15.1238 3.91997 19.0688 6.42434 21.1558C7.90782 22.392 9.99879 22.5888 11.6868 21.651L15.7824 19.3757C17.768 18.2726 18.9994 16.1797 18.9994 13.9082V9Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('stocking', Stocking);
