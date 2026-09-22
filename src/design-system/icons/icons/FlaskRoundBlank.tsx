import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FlaskRoundBlank: React.FC<IconComponentProps> = ({
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
        <><path d="M17 3H7M15 3V9.67363C17.3649 10.7971 19 13.2076 19 16C19 17.9587 18.1955 19.7295 16.899 21H7.10102C5.80447 19.7295 5 17.9587 5 16C5 13.2076 6.63505 10.7971 9 9.67363V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H16V9.07048C18.3896 10.4527 20 13.0374 20 16C20 18.2383 19.0795 20.2634 17.5989 21.7142C17.412 21.8974 17.1607 22 16.899 22H7.10102C6.83931 22 6.58804 21.8974 6.40112 21.7142C4.92053 20.2634 4 18.2383 4 16C4 13.0374 5.61038 10.4527 8 9.07048V4H7C6.44772 4 6 3.55228 6 3Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('flask-round-blank', FlaskRoundBlank);
