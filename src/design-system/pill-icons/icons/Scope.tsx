import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Scope: React.FC<PillIconComponentProps> = ({
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
      <path d="M15.6 8.60005H14.364C14.2238 7.40278 13.6721 6.29138 12.8031 5.45595C11.9341 4.62052 10.8018 4.11295 9.59999 4.02005V2.80005H8.39999V4.06805C7.27736 4.24297 6.24291 4.78076 5.45483 5.59918C4.66674 6.4176 4.1684 7.47162 4.03599 8.60005H2.79999V9.80005H4.03599C4.1684 10.9285 4.66674 11.9825 5.45483 12.8009C6.24291 13.6193 7.27736 14.1571 8.39999 14.332V15.6H9.59999V14.38C10.8018 14.2872 11.9341 13.7796 12.8031 12.9441C13.6721 12.1087 14.2238 10.9973 14.364 9.80005H15.6V8.60005ZM9.59999 13.18V11.6H8.39999V13.12C7.598 12.9557 6.86574 12.5493 6.30208 11.9555C5.73842 11.3618 5.3705 10.6095 5.24799 9.80005H6.79999V8.60005H5.24799C5.3705 7.79061 5.73842 7.03825 6.30208 6.44455C6.86574 5.85084 7.598 5.44439 8.39999 5.28005V6.80005H9.59999V5.22005C10.4832 5.30944 11.3115 5.69007 11.9546 6.302C12.5977 6.91393 13.0189 7.72239 13.152 8.60005H11.6V9.80005H13.152C13.0189 10.6777 12.5977 11.4862 11.9546 12.0981C11.3115 12.71 10.4832 13.0907 9.59999 13.18Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('scope', Scope);
