import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const FlipHorizontal: React.FC<PillIconComponentProps> = ({
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
<path d="M14.2831 6.86778L11.1914 3.77614C11.1559 3.7406 11.0848 3.7406 11.0493 3.7406C11.0137 3.77614 10.9782 3.81167 10.9782 3.88274V5.37526H7.85102C7.70887 5.37526 7.60226 5.48187 7.60226 5.62401V8.36029C7.60226 8.50244 7.70887 8.60905 7.85102 8.60905H10.9782V10.066C10.9782 10.1371 11.0137 10.1726 11.0493 10.2082C11.0848 10.2437 11.1559 10.2082 11.1914 10.1726L14.2831 7.08099C14.3186 7.04546 14.3186 7.00992 14.3186 6.97439C14.3541 6.93885 14.3186 6.90331 14.2831 6.86778Z" fill={iconColor}/>
<path d="M3.69331 11.1321L6.78495 14.2237C6.82049 14.2593 6.89156 14.2593 6.92709 14.2593C6.96263 14.2237 6.99817 14.1882 6.99817 14.1171V12.6246H10.1609C10.303 12.6246 10.4096 12.518 10.4096 12.3759V9.63957C10.4096 9.49743 10.303 9.39082 10.1609 9.39082H7.0337V7.93384C7.0337 7.86277 6.99817 7.82723 6.96263 7.7917C6.92709 7.75616 6.85602 7.7917 6.82049 7.82723L3.72884 10.9189C3.69331 10.9544 3.69331 10.9899 3.69331 11.0255C3.65777 11.061 3.65777 11.0966 3.69331 11.1321Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('flip-horizontal', FlipHorizontal);
