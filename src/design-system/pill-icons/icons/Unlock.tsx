import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Unlock: React.FC<PillIconComponentProps> = ({
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
      <path d="M12.9606 8.18118L9.1731 8.16733V6.09008C9.14841 5.44628 8.87812 4.83638 8.41775 4.38567C7.95738 3.93496 7.34189 3.67766 6.69771 3.66663C6.07173 3.66661 5.47113 3.91409 5.02688 4.3551C4.58263 4.79611 4.33076 5.39488 4.32619 6.02084V7.26719H5.51368V6.02084C5.51551 5.70802 5.64106 5.40863 5.86291 5.18808C6.08476 4.96752 6.38488 4.84373 6.69771 4.84373C7.78827 4.84373 7.78827 6.08662 7.78827 6.08662V8.16387H6.74964C6.56901 8.19029 6.4025 8.2767 6.27692 8.40919C6.15133 8.54169 6.07395 8.71257 6.05723 8.89437V13.7413C6.05723 14.0667 6.49345 14.3333 6.81888 14.3333H13.0818C13.2391 14.3324 13.3897 14.2692 13.5006 14.1577C13.6115 14.0461 13.6738 13.8951 13.6738 13.7378V8.8909C13.6512 8.70999 13.5686 8.54185 13.4394 8.41324C13.3102 8.28463 13.1416 8.20294 12.9606 8.18118Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('unlock', Unlock);
