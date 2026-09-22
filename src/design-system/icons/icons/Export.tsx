import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Export: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14164)">
<path d="M13.4 12.5932V11.2599H9.87335V9.38326H13.4V8.04993L15.3333 10.3333L13.4 12.5932Z" fill={color}/>
<path d="M11.5266 12.1866V13.5433H5.45999V4.45662H9.46664V6.50662H11.5266V8.45661H12.32V6.53662L12.2866 6.50662H12.32L9.46664 3.66663V3.69996L9.43664 3.66663H4.66666V14.3333H12.32V12.1866H11.5266Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14164">
<rect width="12" height="12" fill={color} transform="translate(4 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('export', Export);
