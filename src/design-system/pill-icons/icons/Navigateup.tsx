import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Navigateup: React.FC<PillIconComponentProps> = ({
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
      <path d="M7.4193 3.66663L10.1337 6.79201H8.10782V12.3074C8.10686 12.376 8.11944 12.4442 8.14483 12.508C8.17022 12.5717 8.20793 12.6299 8.2558 12.6791C8.30367 12.7283 8.36076 12.7676 8.42382 12.7948C8.48688 12.8219 8.55466 12.8364 8.62331 12.8373H11.2332C11.3709 12.8345 11.502 12.7778 11.5984 12.6794C11.6948 12.581 11.7487 12.4487 11.7487 12.311V9.57132H13.2952V12.6607C13.2952 13.8286 12.6247 14.3333 11.4927 14.3333H8.19073C7.0516 14.3333 6.56135 13.8286 6.56135 12.6607V6.79201H4.70486L7.4193 3.66663Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('navigateup', Navigateup);
