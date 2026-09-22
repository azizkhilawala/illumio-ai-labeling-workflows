import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const WebcamSlashAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M8.5 3.93648C9.52961 3.34088 10.725 3 12 3C15.866 3 19 6.13401 19 10C19 11.2305 18.6825 12.3868 18.125 13.3915M6 6.39241C5.36518 7.44596 5 8.68033 5 10C5 13.866 8.13401 17 12 17C13.3197 17 14.554 16.6348 15.6076 16M11.5 7.04148C11.6626 7.0142 11.8296 7 12 7C13.6569 7 15 8.34315 15 10C15 10.1704 14.9858 10.3374 14.9585 10.5M7 21H12M12 21H17M12 21V18M3 3L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M16 10C16 10.5292 15.8973 11.0343 15.7106 11.4966L18.6551 14.4411C19.5046 13.1705 20 11.6431 20 10C20 5.58172 16.4183 2 12 2C10.3569 2 8.82945 2.49537 7.55892 3.3449L10.5034 6.28938C10.9657 6.10275 11.4708 6 12 6C14.2091 6 16 7.79086 16 10Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M4.89854 6.31276C4.32446 7.41616 4 8.67019 4 10C4 14.0796 7.05369 17.446 11 17.9381V20H7C6.44772 20 6 20.4477 6 21C6 21.5523 6.44771 22 7 22H17C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20H13V17.9381C13.9588 17.8186 14.8648 17.5293 15.6872 17.1015L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L4.89854 6.31276ZM8.03729 9.45151L12.5485 13.9627C12.3692 13.9873 12.1861 14 12 14C9.79086 14 8 12.2091 8 10C8 9.81393 8.0127 9.63083 8.03729 9.45151Z" fill={color}/>
<path d="M12.2267 8.01271L13.9873 9.77327C13.8831 8.84987 13.1501 8.1169 12.2267 8.01271Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('webcam-slash-alt', WebcamSlashAlt);
