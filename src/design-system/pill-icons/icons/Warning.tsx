import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const Warning: React.FC<PillIconComponentProps> = ({
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
      <path d="M9.2 1.65601L2.8 12.744H15.6L9.2 1.65601ZM8.424 5.25601H9.976V8.856H8.424V5.25601ZM9.2 11.692C9.02438 11.6928 8.85246 11.6415 8.70599 11.5446C8.55952 11.4477 8.44508 11.3095 8.37714 11.1475C8.3092 10.9856 8.29082 10.8071 8.3243 10.6347C8.35779 10.4623 8.44165 10.3037 8.56528 10.1789C8.68891 10.0542 8.84675 9.96891 9.01885 9.93387C9.19095 9.89883 9.36957 9.91561 9.53213 9.98209C9.69469 10.0486 9.83389 10.1618 9.93212 10.3073C10.0304 10.4529 10.0832 10.6244 10.084 10.8C10.0851 10.9168 10.063 11.0326 10.019 11.1408C9.97507 11.2489 9.91012 11.3473 9.82793 11.4303C9.74574 11.5132 9.64793 11.579 9.54015 11.624C9.43238 11.6689 9.31677 11.692 9.2 11.692Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('warning', Warning);
