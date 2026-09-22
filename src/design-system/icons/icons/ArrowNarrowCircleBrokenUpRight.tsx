import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowCircleBrokenUpRight: React.FC<IconComponentProps> = ({
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
        <><path d="M14 15.6569V10M14 10H8.34315M14 10L5.63604 18.364M10.2432 20.8278C13.0904 21.3917 16.1575 20.5704 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C3.42957 7.84251 2.60828 10.9096 3.17216 13.7568" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.4013 2.84638 16.6049 4.25708 18.3288L11.5863 11H8.34382C7.79154 11 7.34382 10.5523 7.34382 10C7.34382 9.44771 7.79154 9 8.34382 9H14.0007C14.553 9 15.0007 9.44771 15.0007 10V15.6569C15.0007 16.2091 14.553 16.6569 14.0007 16.6569C13.4484 16.6569 13.0007 16.2091 13.0007 15.6569V12.4141L5.6713 19.743C7.39517 21.1536 9.59875 22 12 22Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-circle-broken-up-right', ArrowNarrowCircleBrokenUpRight);
