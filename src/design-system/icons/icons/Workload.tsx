import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Workload: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14206)">
<path d="M12.4433 3.66663H5.55666C5.0554 3.66663 4.57467 3.86575 4.22022 4.22019C3.86578 4.57464 3.66666 5.05537 3.66666 5.55663L3.66666 12.4433C3.66666 12.9446 3.86578 13.4253 4.22022 13.7797C4.57467 14.1342 5.0554 14.3333 5.55666 14.3333H12.4433C12.9446 14.3333 13.4253 14.1342 13.7798 13.7797C14.1342 13.4253 14.3333 12.9446 14.3333 12.4433V5.55663C14.3333 5.05537 14.1342 4.57464 13.7798 4.22019C13.4253 3.86575 12.9446 3.66663 12.4433 3.66663V3.66663Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14206">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('workload', Workload);
