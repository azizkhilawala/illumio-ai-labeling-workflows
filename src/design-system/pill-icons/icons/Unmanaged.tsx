import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Unmanaged: React.FC<PillIconComponentProps> = ({
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
<path d="M12.4433 3.66663H5.55666C5.05541 3.66663 4.57468 3.86575 4.22023 4.22019C3.86579 4.57464 3.66666 5.05537 3.66666 5.55663L3.66666 12.4433C3.66666 12.9446 3.86579 13.4253 4.22023 13.7797C4.57468 14.1342 5.05541 14.3333 5.55666 14.3333H12.4433C12.9446 14.3333 13.4253 14.1342 13.7798 13.7797C14.1342 13.4253 14.3333 12.9446 14.3333 12.4433V5.55663C14.3333 5.05537 14.1342 4.57464 13.7798 4.22019C13.4253 3.86575 12.9446 3.66663 12.4433 3.66663V3.66663ZM13.1567 12.4433C13.1567 12.6325 13.0815 12.8139 12.9477 12.9477C12.814 13.0815 12.6325 13.1566 12.4433 13.1566H5.55666C5.42064 13.1565 5.28754 13.1172 5.17333 13.0433L12.9667 5.06996C13.0888 5.2013 13.1566 5.37397 13.1567 5.55329V12.4433Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('unmanaged', Unmanaged);
