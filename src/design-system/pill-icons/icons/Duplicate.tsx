import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Duplicate: React.FC<PillIconComponentProps> = ({
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
<path d="M13.3633 5.55329H12.4467V3.66663H3.66667V12.4466H5.55334V14.3333H14.3333V5.55329H13.3633ZM5.55667 5.55329V11.4733H4.63667V4.63663H11.4733V5.55329H5.55667ZM13.3633 13.3633H6.52667V6.52663H13.3633V13.3633Z" fill={iconColor}/>
<path d="M9.53331 12.2499H10.3533V10.3533H12.25V9.53326H10.3533V7.6366H9.53331V9.53326H7.63664V10.3533H9.53331V12.2499Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('duplicate', Duplicate);
