import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Copy: React.FC<PillIconComponentProps> = ({
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
<path d="M8.28889 13.6596H13.6222V6.54846H8.28889V13.6596ZM9 8.6818H12.9111V9.39291H9V8.6818ZM9 10.104H12.9111V10.8151H9V10.104ZM9 11.5262H12.9111V12.2374H9V11.5262Z" fill={iconColor}/>
<path d="M9 10.104H12.9111V10.8151H9V10.104Z" fill={iconColor}/>
<path d="M9 8.68176H12.9111V9.39287H9V8.68176Z" fill={iconColor}/>
<path d="M9 11.5262H12.9111V12.2374H9V11.5262Z" fill={iconColor}/>
<path d="M10.4222 5.84085V3.70752H3.66666V12.2409H7.57778V14.2924H14.3333V5.8373L10.4222 5.84085ZM7.57778 6.55196H5.08889V7.26307H7.57778V7.97419H5.08889V8.6853H7.57778V9.39641H5.08889V10.1075H7.57778V11.5297H4.31022V4.41863H9.71111V5.84085H7.57778V6.55196ZM13.6222 13.6631H8.28889V6.55196H13.6222V13.6631Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('copy', Copy);
