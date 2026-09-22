import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ZoomToFit: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<g clip-path="url(#clip0_1218_14170)">
<path d="M5.44333 10.9299L7.66334 8.73657L9.29334 10.3632L7.08 12.5499L8.86668 14.3299H3.66999L3.66666 9.14324L5.44333 10.9299Z" fill={color}/>
<path d="M12.5566 7.06993L10.3366 9.26328L8.70996 7.6366L10.92 5.44993L9.1333 3.66992H14.33L14.3333 8.85661L12.5566 7.06993Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14170">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('zoom-to-fit', ZoomToFit);
