import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const Moon: React.FC<IconComponentProps> = ({
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
        <><path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M9.89306 3.69124C10.0417 3.31952 9.95431 2.89498 9.67095 2.61218C9.3876 2.32938 8.9629 2.24282 8.59147 2.39217C4.91719 3.86957 2.32031 7.46708 2.32031 11.6735C2.32031 17.1964 6.79746 21.6735 12.3203 21.6735C16.5298 21.6735 20.1295 19.0728 21.6049 15.3943C21.754 15.0226 21.6669 14.5978 21.3836 14.3147C21.1004 14.0316 20.6755 13.9448 20.3039 14.0941C19.3811 14.465 18.373 14.6734 17.3203 14.6734C12.902 14.6734 9.32031 11.0917 9.32031 6.67344C9.32031 5.62357 9.52626 4.6086 9.89306 3.69124Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('moon', Moon);
