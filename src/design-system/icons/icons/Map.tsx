import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Map: React.FC<IconComponentProps> = ({
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
        <><path d="M9 20L3 17V4L9 7M9 20L15 17M9 20V7M15 17L21 20V7L15 4M15 17V4M9 7L15 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M8 5.38197L3.44721 3.10557C3.13723 2.95058 2.76909 2.96714 2.47427 3.14935C2.17945 3.33156 2 3.65342 2 4V17C2 17.3788 2.214 17.725 2.55279 17.8944L8 20.618V5.38197Z" fill={color}/>
<path d="M10 20.618V5.38197L14 3.38197V18.618L10 20.618Z" fill={color}/>
<path d="M16 18.618L20.5528 20.8944C20.8628 21.0494 21.2309 21.0329 21.5257 20.8507C21.8205 20.6684 22 20.3466 22 20V7C22 6.62123 21.786 6.27497 21.4472 6.10557L16 3.38197V18.618Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('map', Map);
