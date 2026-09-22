import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ArrowNarrowCircleBrokenDownLeft: React.FC<IconComponentProps> = ({
  variant = 'linear',
  size = 24,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`ds-icon ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 'linear' && (
        <><path d="M10 8.34315V14M10 14H15.5M10 14L18.364 5.63604M13.7568 3.17216C10.9096 2.60828 7.84251 3.42957 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C20.5704 16.1575 21.3917 13.0904 20.8278 10.2432" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12 22C17.5228 22 22 17.5228 22 12C22 9.59873 21.1536 7.39514 19.7429 5.67126L12.4142 12.9999H15.5C16.0523 12.9999 16.5 13.4477 16.5 13.9999C16.5 14.5522 16.0523 14.9999 15.5 14.9999H10C9.44771 14.9999 9 14.5522 9 13.9999V8.49995C9 7.94766 9.44771 7.49995 10 7.49995C10.5523 7.49995 11 7.94766 11 8.49995V11.5857L18.3287 4.25705C16.6049 2.84636 14.4013 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('arrow-narrow-circle-broken-down-left', ArrowNarrowCircleBrokenDownLeft);
