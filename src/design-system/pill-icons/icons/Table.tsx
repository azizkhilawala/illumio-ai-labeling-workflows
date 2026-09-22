import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Table: React.FC<PillIconComponentProps> = ({
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
      <path fillRule="evenodd" clipRule="evenodd" d="M2.79999 4.54541H15.6V13.8545H2.79999V4.54541ZM3.38181 6.87268H6.87271V8.61814H3.38181V6.87268ZM7.45453 6.87268H10.9454V8.61814H7.45453V6.87268ZM11.5273 6.87268H15.0182V8.61814H11.5273V6.87268ZM3.38181 9.19996H6.87271V10.9454H3.38181V9.19996ZM7.45453 9.19996H10.9454V10.9454H7.45453V9.19996ZM11.5273 9.19996H15.0182V10.9454H11.5273V9.19996ZM3.38181 11.5272H6.87271V13.2727H3.38181V11.5272ZM7.45453 11.5272H10.9454V13.2727H7.45453V11.5272ZM11.5273 11.5272H15.0182V13.2727H11.5273V11.5272Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('table', Table);
