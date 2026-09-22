import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const RotateCcw: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M12.5 20.5C17.1944 20.5 21 16.6944 21 12C21 7.30558 17.1944 3.5 12.5 3.5C7.80558 3.5 4 7.30558 4 12C4 13.5433 4.41128 14.9905 5.13022 16.238M1.5 15L5.13022 16.238M6.82531 12.3832L5.47107 16.3542L5.13022 16.238" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.5 4.5C8.35789 4.5 5.00003 7.85786 5.00003 12C5.00003 12.6624 5.08568 13.304 5.24644 13.9149L5.87886 12.0604C6.05713 11.5377 6.62539 11.2584 7.14812 11.4367C7.67084 11.615 7.95008 12.1832 7.77182 12.706L6.41757 16.677C6.33197 16.928 6.15015 17.1348 5.91212 17.2517C5.67409 17.3687 5.39934 17.3863 5.14832 17.3007L1.17725 15.9465C0.654529 15.7682 0.375289 15.1999 0.553552 14.6772C0.731816 14.1545 1.30008 13.8753 1.8228 14.0535L3.35357 14.5756C3.1232 13.756 3.00003 12.892 3.00003 12C3.00003 6.75329 7.25332 2.5 12.5 2.5C17.7467 2.5 22 6.75329 22 12C22 17.2467 17.7467 21.5 12.5 21.5C11.9477 21.5 11.5 21.0523 11.5 20.5C11.5 19.9477 11.9477 19.5 12.5 19.5C16.6422 19.5 20 16.1421 20 12C20 7.85786 16.6422 4.5 12.5 4.5Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('rotate-ccw', RotateCcw);
