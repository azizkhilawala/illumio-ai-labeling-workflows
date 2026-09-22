import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const ZoomToFit: React.FC<PillIconComponentProps> = ({
  size = 18,
  bgColor = 'var(--lightning-bluegray-600)',
  iconColor = 'var(--lightning-contrast-white)',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-pill-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="9" cy="9" r="9" fill={bgColor} />
      {/* Icon content */}
      <g >
<path d="M5.44333 10.9299L7.66334 8.73657L9.29334 10.3632L7.08 12.5499L8.86668 14.3299H3.66999L3.66666 9.14324L5.44333 10.9299Z" fill={iconColor}/>
<path d="M12.5566 7.06993L10.3366 9.26328L8.70996 7.6366L10.92 5.44993L9.1333 3.66992H14.33L14.3333 8.85661L12.5566 7.06993Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('zoom-to-fit', ZoomToFit);
