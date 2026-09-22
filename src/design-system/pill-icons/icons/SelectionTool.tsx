import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const SelectionTool: React.FC<PillIconComponentProps> = ({
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
<path d="M10.25 6.01996H10.8667V4.66663H9.50334V5.29329H10.25V6.01996Z" fill={iconColor}/>
<path d="M4.74667 6.01996H5.36334V5.29329H6.11V4.66663H4.74667V6.01996Z" fill={iconColor}/>
<path d="M5.36334 9.41333H4.74667V10.7933H6.11V10.17H5.36334V9.41333Z" fill={iconColor}/>
<path d="M10.8733 6.91663H10.2467V8.69996H10.8733V6.91663Z" fill={iconColor}/>
<path d="M5.37 6.91663H4.74333V8.69996H5.37V6.91663Z" fill={iconColor}/>
<path d="M8.73337 4.66663H6.95004V5.29329H8.73337V4.66663Z" fill={iconColor}/>
<path d="M7.53337 7.31323L8.37004 10.1666H6.95004V10.7932H8.55337L9.88671 15.3332L11.5 12.3099L15.2567 11.7132L7.53337 7.31323Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('selection-tool', SelectionTool);
