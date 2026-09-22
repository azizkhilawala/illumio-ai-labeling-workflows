import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const AcrossEnfBoundaryRtl: React.FC<PillIconComponentProps> = ({
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
      <path d="M5.69427 11.6051V9.68922H15.6V8.62934H5.69427V6.71342L2.8 9.15928L5.69427 11.6051Z" fill={iconColor}/>
<path d="M7.81404 4.10449V7.36564H11.8905V4.10449H7.81404ZM11.0752 6.55035L9.48537 5.00131H11.0752V6.55035ZM9.89302 6.55035H8.62932V5.28666L9.89302 6.55035Z" fill={iconColor}/>
<path d="M7.81404 11.0344V14.2956H11.8905V11.0344H7.81404ZM11.0752 13.4803L9.48537 11.9312H11.0752V13.4803ZM9.89302 13.4803H8.62932V12.2166L9.89302 13.4803Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('across-enf-boundary-rtl', AcrossEnfBoundaryRtl);
