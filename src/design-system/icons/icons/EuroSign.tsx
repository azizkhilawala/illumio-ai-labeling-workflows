import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const EuroSign: React.FC<IconComponentProps> = ({
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
        <><path d="M19 7.11111C17.775 5.21864 15.8556 4 13.6979 4C9.99875 4 7 7.58172 7 12C7 16.4183 9.99875 20 13.6979 20C15.8556 20 17.775 18.7814 19 16.8889M5 10H14M5 14H14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M8.05661 11C8.01936 11.3249 8 11.6586 8 12C8 12.3414 8.01936 12.6751 8.05661 13H14C14.5523 13 15 13.4477 15 14C15 14.5523 14.5523 15 14 15H8.54517C9.4842 17.4229 11.5171 19 13.6979 19C15.4553 19 17.0839 18.0087 18.1605 16.3455C18.4606 15.8819 19.0798 15.7493 19.5434 16.0494C20.007 16.3495 20.1396 16.9686 19.8395 17.4323C18.4661 19.554 16.2559 21 13.6979 21C10.2438 21 7.47856 18.4221 6.44169 15H5C4.44772 15 4 14.5523 4 14C4 13.4477 4.44772 13 5 13H6.04784C6.01619 12.6704 6 12.3367 6 12C6 11.6633 6.01619 11.3296 6.04784 11H5C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H6.44169C7.47856 5.57792 10.2438 3 13.6979 3C16.2559 3 18.4661 4.44601 19.8395 6.56772C20.1396 7.03136 20.007 7.65049 19.5434 7.95059C19.0798 8.2507 18.4606 8.11813 18.1605 7.6545C17.0839 5.99127 15.4553 5 13.6979 5C11.5171 5 9.4842 6.57712 8.54517 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H8.05661Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('euro-sign', EuroSign);
