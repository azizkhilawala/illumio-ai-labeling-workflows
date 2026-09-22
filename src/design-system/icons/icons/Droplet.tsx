import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Droplet: React.FC<IconComponentProps> = ({
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
        <><path d="M19 13.8C19 17.7764 15.866 21 12 21C8.13401 21 5 17.7764 5 13.8C5 12.8452 5.18069 11.9338 5.50883 11.1C6.54726 8.46135 12 3 12 3C12 3 17.4527 8.46135 18.4912 11.1C18.8193 11.9338 19 12.8452 19 13.8Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.725 2.31086L12.7077 2.29345C12.5201 2.10557 12.2655 2 12 2C11.7345 2 11.4799 2.10557 11.2923 2.29345L11.275 2.31086L11.2274 2.35885C11.1861 2.4007 11.1257 2.46193 11.0488 2.54053C10.8951 2.6977 10.675 2.92445 10.408 3.20454C9.87443 3.76422 9.15099 4.53937 8.39338 5.39957C7.63729 6.25805 6.83877 7.21073 6.15895 8.12415C5.49269 9.01936 4.88915 9.9439 4.57829 10.7338C4.20485 11.6827 4 12.7182 4 13.8C4 18.302 7.55535 22 12 22C16.4446 22 20 18.302 20 13.8C20 12.7182 19.7951 11.6827 19.4217 10.7338C19.1108 9.9439 18.5073 9.01936 17.841 8.12415C17.1612 7.21073 16.3627 6.25805 15.6066 5.39957C14.849 4.53937 14.1256 3.76422 13.592 3.20454C13.325 2.92445 13.1049 2.6977 12.9512 2.54053C12.8743 2.46193 12.8139 2.4007 12.7726 2.35885L12.725 2.31086Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('droplet', Droplet);
