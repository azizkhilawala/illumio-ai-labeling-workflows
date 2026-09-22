import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const List: React.FC<PillIconComponentProps> = ({
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
      <path d="M14.3333 4.4917H6.54004V6.20503H14.3333V4.4917Z" fill={iconColor}/>
<path d="M14.3333 8.13171H6.54004V9.84504H14.3333V8.13171Z" fill={iconColor}/>
<path d="M14.3333 11.795H6.54004V13.5084H14.3333V11.795Z" fill={iconColor}/>
<path d="M4.52002 6.19836C4.9913 6.19836 5.37335 5.81631 5.37335 5.34503C5.37335 4.87375 4.9913 4.4917 4.52002 4.4917C4.04874 4.4917 3.66669 4.87375 3.66669 5.34503C3.66669 5.81631 4.04874 6.19836 4.52002 6.19836Z" fill={iconColor}/>
<path d="M4.52002 9.83496C4.9913 9.83496 5.37335 9.45291 5.37335 8.98163C5.37335 8.51034 4.9913 8.1283 4.52002 8.1283C4.04874 8.1283 3.66669 8.51034 3.66669 8.98163C3.66669 9.45291 4.04874 9.83496 4.52002 9.83496Z" fill={iconColor}/>
<path d="M4.52002 13.4883C4.9913 13.4883 5.37335 13.1062 5.37335 12.6349C5.37335 12.1637 4.9913 11.7816 4.52002 11.7816C4.04874 11.7816 3.66669 12.1637 3.66669 12.6349C3.66669 13.1062 4.04874 13.4883 4.52002 13.4883Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('list', List);
