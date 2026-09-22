import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Illuminate: React.FC<PillIconComponentProps> = ({
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
<path d="M14.3333 9.42996V8.56996H11.0633C11.0111 8.31072 10.9116 8.06328 10.77 7.83996L13.0767 5.53329L12.4667 4.92329L10.1767 7.21329C9.95224 7.05611 9.69999 6.94299 9.43333 6.87996V3.66663H8.57V6.85663C8.28669 6.90483 8.01584 7.00909 7.77333 7.16329L5.53333 4.92329L4.92333 5.53329L7.15 7.75996C6.98474 8.00436 6.87129 8.28003 6.81667 8.56996H3.66667V9.42996H6.80333C6.85805 9.71986 6.97149 9.99551 7.13667 10.24L4.92333 12.4666L5.53333 13.0766L7.77333 10.8366C8.01584 10.9908 8.28669 11.0951 8.57 11.1433V14.3333H9.43V11.1166C9.69665 11.0536 9.9489 10.9405 10.1733 10.7833L12.4633 13.0733L13.0733 12.4633L10.77 10.16C10.9116 9.93663 11.0111 9.6892 11.0633 9.42996H14.3333Z" fill={iconColor}/>
</g>
    </svg>
  );
};

registerPillIcon('illuminate', Illuminate);
