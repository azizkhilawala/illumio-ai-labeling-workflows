import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Import: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14151)">
<path d="M7.59334 12.5933V11.2599H3.66667V9.38326H7.59334V8.04993L9.74334 10.3333L7.59334 12.5933Z" fill={color}/>
<path d="M14.3333 6.50663L11.16 3.66663V3.69996L11.1233 3.66663H5.81665V8.45663H6.69998V4.45663H11.16V6.50663H13.45V13.5433H6.69998V12.1866H5.81665V14.3333H14.3333V6.53663L14.2966 6.50663H14.3333Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14151">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('import', Import);
