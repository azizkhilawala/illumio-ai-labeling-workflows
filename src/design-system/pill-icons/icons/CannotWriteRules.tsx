import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const CannotWriteRules: React.FC<PillIconComponentProps> = ({
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
      <path fillRule="evenodd" clipRule="evenodd" d="M11.4807 6.68481V8.33856H9.8269V9.66156H11.4807V11.3153L16.1111 9.00006L11.4807 6.68481Z" fill={iconColor}/>
<path d="M3.87341 8.3385H1.88892V9.6615H3.87341V8.3385Z" fill={iconColor}/>
<path d="M6.51941 8.3385H4.53491V9.6615H6.51941V8.3385Z" fill={iconColor}/>
<path d="M9.1654 8.3385H7.18091V9.6615H9.1654V8.3385Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('cannot-write-rules', CannotWriteRules);
