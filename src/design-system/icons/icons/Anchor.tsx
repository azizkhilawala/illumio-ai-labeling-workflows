import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Anchor: React.FC<IconComponentProps> = ({
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
        <><path d="M12 8.4C13.4912 8.4 14.7 7.19117 14.7 5.7C14.7 4.20883 13.4912 3 12 3C10.5088 3 9.3 4.20883 9.3 5.7C9.3 7.19117 10.5088 8.4 12 8.4ZM12 8.4V20.9999M12 20.9999C9.61305 20.9999 7.32387 20.0518 5.63604 18.364C3.94821 16.6761 3 14.3869 3 12H5M12 20.9999C14.3869 20.9999 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 2C9.95655 2 8.3 3.65655 8.3 5.7C8.3 7.39693 9.44236 8.82705 11 9.26328V19.9372C9.24698 19.7164 7.60576 18.9195 6.34315 17.6569C5.08052 16.3942 4.28353 14.753 4.06272 13H5C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11H3C2.44772 11 2 11.4477 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.80432 20.9464 9.34786 21.9999 12 21.9999C14.6521 21.9999 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 11.4477 21.5523 11 21 11H19C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13H19.9373C19.7165 14.753 18.9195 16.3942 17.6569 17.6569C16.3942 18.9195 14.753 19.7164 13 19.9372V9.26328C14.5576 8.82705 15.7 7.39693 15.7 5.7C15.7 3.65655 14.0435 2 12 2Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('anchor', Anchor);
