import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Dashboard: React.FC<IconComponentProps> = ({
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
<g clip-path="url(#clip0_1218_14234)">
<path d="M7.36362 4.66444V6.32747H4.70277V4.66444H7.36362ZM8.36144 3.66663H3.70496V7.32529H8.36144V3.66663Z" fill={color}/>
<path d="M7.33698 9.34425V13.3355H4.67613V9.34425H7.33698ZM8.33479 8.34644H3.67831V14.3333H8.33479V8.34644Z" fill={color}/>
<path d="M13.3239 4.68104V8.67231H10.663V4.68104H13.3239ZM14.3217 3.68323H9.66522V9.67013H14.3217V3.68323Z" fill={color}/>
<path d="M13.3039 11.6259V13.2889H10.6431V11.6259H13.3039ZM14.3017 10.6281H9.64523V14.2867H14.3017V10.6281Z" fill={color}/>
</g>
<defs>
<clipPath id="clip0_1218_14234">
<rect width="12" height="12" fill={color} transform="translate(3 3)"/>
</clipPath>
</defs></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('dashboard', Dashboard);
