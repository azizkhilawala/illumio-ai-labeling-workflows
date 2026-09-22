import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowCircleBrokenRight: React.FC<IconComponentProps> = ({
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
        <><path d="M8 11L12 15M12 15L16 11M12 15V3M7 4.51555C4.58803 6.13007 3 8.87958 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.87958 19.412 6.13007 17 4.51555" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M11 2.04932C5.94668 2.55104 2 6.81459 2 11.9999C2 17.5228 6.47715 21.9999 12 21.9999C17.5228 21.9999 22 17.5228 22 11.9999C22 6.81459 18.0533 2.55104 13 2.04932V12.5857L15.2929 10.2928C15.6834 9.90231 16.3166 9.90231 16.7071 10.2928C17.0976 10.6834 17.0976 11.3165 16.7071 11.707L12.7071 15.707C12.3166 16.0976 11.6834 16.0976 11.2929 15.707L7.29289 11.707C6.90237 11.3165 6.90237 10.6834 7.29289 10.2928C7.68342 9.90231 8.31658 9.90231 8.70711 10.2928L11 12.5857V2.04932Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-circle-broken-right', ArrowNarrowCircleBrokenRight);
