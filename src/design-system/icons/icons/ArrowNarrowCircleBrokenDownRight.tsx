import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowCircleBrokenDownRight: React.FC<IconComponentProps> = ({
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
        <><path d="M8.34315 14H14M14 14V8.34315M14 14L5.63604 5.63604M3.17216 10.2432C2.60828 13.0904 3.42957 16.1575 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C16.1575 3.42957 13.0904 2.60828 10.2432 3.17216" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C9.59875 2 7.39517 2.84635 5.67131 4.25702L13.0007 11.5859V8.34309C13.0007 7.79081 13.4484 7.34309 14.0007 7.34309C14.553 7.34309 15.0007 7.79081 15.0007 8.34309V13.9999C15.0007 14.5522 14.553 14.9999 14.0007 14.9999H8.34383C7.79154 14.9999 7.34383 14.5522 7.34383 13.9999C7.34383 13.4477 7.79154 12.9999 8.34383 12.9999H11.5863L4.25709 5.67123C2.84638 7.39511 2 9.59871 2 12C2 17.5228 6.47715 22 12 22Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-circle-broken-down-right', ArrowNarrowCircleBrokenDownRight);
