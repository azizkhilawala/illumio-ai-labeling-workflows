import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Icicles: React.FC<IconComponentProps> = ({
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
        <><path d="M16 4L18.5 20L21 4H16ZM16 4L12 4M16 4L14 11L12 4M12 4L8 4M12 4L10 14L8 4M8 4L3 4L5.5 11L8 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M15.7134 8.64325L17.512 20.1544C17.5881 20.6412 18.0073 21 18.5 21C18.9927 21 19.412 20.6412 19.488 20.1544L21.988 4.15438C22.0331 3.8657 21.9497 3.57174 21.7597 3.34976C21.5697 3.12778 21.2922 3 21 3L3.00001 3C2.67481 3 2.36992 3.15813 2.18259 3.42395C1.99526 3.68977 1.94889 4.03008 2.05826 4.33634L4.55826 11.3363C4.7004 11.7343 5.07739 12 5.50001 12C5.92262 12 6.29961 11.7343 6.44175 11.3363L7.72747 7.73632L9.01943 14.1961C9.11291 14.6635 9.52333 15 10 15C10.4767 15 10.8871 14.6635 10.9806 14.1961L12.1716 8.24081L13.0385 11.2747C13.1611 11.704 13.5535 12 14 12C14.4465 12 14.8389 11.704 14.9615 11.2747L15.7134 8.64325Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('icicles', Icicles);
