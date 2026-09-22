import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const PresentationScreen: React.FC<IconComponentProps> = ({
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
        <><path d="M3 3H21M12 18L7 21M12 18L17 21M12 18V21M12 18V15M12 15H15.8C16.9201 15 17.4802 15 17.908 14.782C18.2843 14.5903 18.5903 14.2843 18.782 13.908C19 13.4802 19 12.9201 19 11.8V7M12 15H8.2C7.0799 15 6.51984 15 6.09202 14.782C5.71569 14.5903 5.40973 14.2843 5.21799 13.908C5 13.4802 5 12.9201 5 11.8V7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3Z" fill={color}/>
<path d="M20 7C20 6.44772 19.5523 6 19 6H5C4.44772 6 4 6.44772 4 7V11.8385C3.99998 12.3657 3.99997 12.8205 4.03057 13.195C4.06287 13.5904 4.13419 13.9836 4.32698 14.362C4.6146 14.9265 5.07354 15.3854 5.63803 15.673C6.01641 15.8658 6.40963 15.9371 6.80497 15.9694C7.17954 16 7.6343 16 8.16145 16H11V17.4338L6.48551 20.1425C6.01193 20.4267 5.85836 21.0409 6.14251 21.5145C6.42666 21.9881 7.04092 22.1416 7.5145 21.8575L11 19.7662V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V19.7662L16.4855 21.8575C16.9591 22.1416 17.5733 21.9881 17.8575 21.5145C18.1416 21.0409 17.9881 20.4267 17.5145 20.1425L13 17.4338V16H15.8385C16.3657 16 16.8205 16 17.195 15.9694C17.5904 15.9371 17.9836 15.8658 18.362 15.673C18.9265 15.3854 19.3854 14.9265 19.673 14.362C19.8658 13.9836 19.9371 13.5904 19.9694 13.195C20 12.8205 20 12.3657 20 11.8386V7Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('presentation-screen', PresentationScreen);
