import React from 'react';
import type { PillIconComponentProps } from '../types';
import { registerPillIcon } from '../registry';

export const AcrossEnfBoundary: React.FC<PillIconComponentProps> = ({
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
      <path d="M15.6 9.17139L12.6807 6.71755V8.6447H2.8V9.69809H12.6807V11.6212L15.6 9.17139Z" fill={iconColor}/>
<path d="M6.4869 4.09631V7.36266H10.5698V4.09631H6.4869ZM7.30349 4.99456H8.89175L7.34024 6.54607H7.30349V4.99456ZM9.75325 5.28445V6.54607H8.49162L9.75325 5.28445Z" fill={iconColor}/>
<path d="M6.4869 11.0373V14.3036H10.5698V11.0373H6.4869ZM7.30349 11.9355H8.89175L7.34024 13.4871H7.30349V11.9355ZM9.75325 12.2254V13.4871H8.49162L9.75325 12.2254Z" fill={iconColor}/>
    </svg>
  );
};

registerPillIcon('across-enf-boundary', AcrossEnfBoundary);
