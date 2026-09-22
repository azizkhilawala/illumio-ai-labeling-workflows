import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Edit: React.FC<PillIconComponentProps> = ({
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
<path d="M10.4421 5.61035L3.67536 12.4071V14.3333H5.62821L12.385 7.55322L10.4421 5.61035Z" fill={iconColor}/>
<path d="M12.3812 3.66659L11.1017 4.94653L13.0451 6.8893L14.3246 5.60936L12.3812 3.66659Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('edit', Edit);
