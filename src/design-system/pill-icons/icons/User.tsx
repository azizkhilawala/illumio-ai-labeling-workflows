import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const User: React.FC<PillIconComponentProps> = ({
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
<path d="M6.33333 7.66663V6.33329C6.33333 5.62605 6.61428 4.94777 7.11438 4.44767C7.61448 3.94758 8.29276 3.66663 9 3.66663C9.70724 3.66663 10.3855 3.94758 10.8856 4.44767C11.3857 4.94777 11.6667 5.62605 11.6667 6.33329V7.66663C11.6667 8.37387 11.3857 9.05215 10.8856 9.55224C10.3855 10.0523 9.70724 10.3333 9 10.3333C8.29276 10.3333 7.61448 10.0523 7.11438 9.55224C6.61428 9.05215 6.33333 8.37387 6.33333 7.66663ZM13.9633 12.4033C13.85 12.3333 11.1333 11 9 11C6.86667 11 4.15 12.3333 4.03667 12.4033C3.9256 12.4585 3.83212 12.5436 3.76676 12.649C3.7014 12.7544 3.66673 12.8759 3.66667 13V13.6666C3.66667 13.8434 3.7369 14.013 3.86193 14.138C3.98695 14.2631 4.15652 14.3333 4.33333 14.3333H13.6667C13.8435 14.3333 14.013 14.2631 14.1381 14.138C14.2631 14.013 14.3333 13.8434 14.3333 13.6666V13C14.3333 12.8759 14.2986 12.7544 14.2332 12.649C14.1679 12.5436 14.0744 12.4585 13.9633 12.4033Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('user', User);
