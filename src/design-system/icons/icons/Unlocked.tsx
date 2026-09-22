import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Unlocked: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><circle cx="9" cy="9" r="9" fill={color}/>
<path d="M12.9606 8.18118L9.17311 8.16733V6.09008C9.14842 5.44628 8.87813 4.83638 8.41776 4.38567C7.95739 3.93496 7.34189 3.67766 6.69772 3.66663C6.07174 3.66661 5.47114 3.91409 5.02689 4.3551C4.58264 4.79611 4.33076 5.39488 4.32619 6.02084V7.26719H5.51369V6.02084C5.51552 5.70802 5.64107 5.40863 5.86292 5.18808C6.08477 4.96752 6.38489 4.84373 6.69772 4.84373C7.78827 4.84373 7.78827 6.08662 7.78827 6.08662V8.16387H6.74965C6.56901 8.19029 6.40251 8.2767 6.27692 8.40919C6.15133 8.54169 6.07396 8.71257 6.05723 8.89437V13.7413C6.05723 14.0667 6.49346 14.3333 6.81889 14.3333H13.0818C13.2391 14.3324 13.3897 14.2692 13.5006 14.1577C13.6115 14.0461 13.6738 13.8951 13.6738 13.7378V8.8909C13.6512 8.70999 13.5687 8.54185 13.4394 8.41324C13.3102 8.28463 13.1416 8.20294 12.9606 8.18118Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('unlocked', Unlocked);
