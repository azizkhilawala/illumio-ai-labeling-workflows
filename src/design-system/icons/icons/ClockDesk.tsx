import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const ClockDesk: React.FC<IconComponentProps> = ({
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
        <><path d="M19 10C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 10M19 10C19 6.13401 15.866 3 12 3C8.13401 3 5 6.13401 5 10M19 10V14.7998V16.1998C19 17.88 19 18.72 18.673 19.3618C18.3854 19.9263 17.9265 20.3852 17.362 20.6728C16.7202 20.9998 15.8802 20.9998 14.2 20.9998H9.8C8.11984 20.9998 7.27976 20.9998 6.63803 20.6728C6.07354 20.3852 5.6146 19.9263 5.32698 19.3618C5 18.72 5 17.88 5 16.1998V14.7998V10M12 7V10L14 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58172 2 4 5.58172 4 10C4 14.4183 7.58172 18 12 18C16.4183 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2ZM12 6C12.5523 6 13 6.44772 13 7V9.58579L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L11.2929 10.7071C11.1054 10.5196 11 10.2652 11 10V7C11 6.44772 11.4477 6 12 6Z" fill={color}/>
<path d="M12 19.0002C15.4829 19.0002 18.5038 17.0218 20 14.1274V15.6002C20 17.8404 20 18.9606 19.564 19.8162C19.1805 20.5688 18.5686 21.1808 17.816 21.5643C16.9603 22.0002 15.8402 22.0002 13.6 22.0002H10.4C8.15979 22.0002 7.03969 22.0002 6.18404 21.5643C5.43139 21.1808 4.81947 20.5688 4.43597 19.8162C4 18.9606 4 17.8404 4 15.6002V14.1274C5.49623 17.0218 8.51707 19.0002 12 19.0002Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('clock-desk', ClockDesk);
