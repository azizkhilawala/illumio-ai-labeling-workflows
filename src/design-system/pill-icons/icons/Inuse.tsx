import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Inuse: React.FC<PillIconComponentProps> = ({
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
<path d="M8.99999 3.66663C7.94516 3.66663 6.91401 3.97942 6.03695 4.56545C5.15989 5.15149 4.4763 5.98444 4.07263 6.95898C3.66897 7.93352 3.56335 9.00587 3.76914 10.0404C3.97493 11.075 4.48288 12.0253 5.22876 12.7712C5.97464 13.5171 6.92494 14.025 7.95951 14.2308C8.99407 14.4366 10.0664 14.331 11.041 13.9273C12.0155 13.5236 12.8485 12.8401 13.4345 11.963C14.0205 11.0859 14.3333 10.0548 14.3333 8.99996C14.3333 7.58547 13.7714 6.22892 12.7712 5.22872C11.771 4.22853 10.4145 3.66663 8.99999 3.66663V3.66663ZM8.06666 11.95L5.66666 9.56329L6.82332 8.42329L8.12999 9.72996L11.13 6.72996L12.21 7.80996L8.06666 11.95Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('inuse', Inuse);
