import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const FlaskRoundPotion: React.FC<IconComponentProps> = ({
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
        <><path d="M17 3H7M15 3V9.67363C17.3649 10.7971 19 13.2076 19 16M19 16C19 17.9587 18.1955 19.7295 16.899 21H7.10102C5.80447 19.7295 5 17.9587 5 16M19 16H16.8028C15.6273 16 14.4781 15.6521 13.5 15C12.5219 14.3479 11.3727 14 10.1972 14H10C9.81842 14 9.72763 14 9.63865 14.0026C8.5756 14.0342 7.54004 14.3477 6.63803 14.9112C6.56253 14.9583 6.48697 15.0087 6.3359 15.1094L5 16M9 3V9.67363C6.63505 10.7971 5 13.2076 5 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H16V9.07048C18.3896 10.4527 20 13.0374 20 16C20 18.2383 19.0795 20.2634 17.5989 21.7142C17.412 21.8974 17.1607 22 16.899 22H7.10102C6.83931 22 6.58804 21.8974 6.40112 21.7142C4.92053 20.2634 4 18.2383 4 16C4 13.0374 5.61038 10.4527 8 9.07048V4H7C6.44772 4 6 3.55228 6 3ZM10 4V9.67363C10 10.0597 9.77779 10.4112 9.42909 10.5769C8.02513 11.2438 6.92256 12.4387 6.3763 13.9038C7.36352 13.3466 8.47279 13.0368 9.60898 13.0031C9.71294 13 9.81758 13 9.98411 13H10.1972C11.5701 13 12.9124 13.4064 14.0547 14.1679C14.8685 14.7105 15.8247 15 16.8028 15H17.917C17.5885 13.0416 16.3113 11.4037 14.5709 10.5769C14.2222 10.4112 14 10.0597 14 9.67363V4H10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('flask-round-potion', FlaskRoundPotion);
