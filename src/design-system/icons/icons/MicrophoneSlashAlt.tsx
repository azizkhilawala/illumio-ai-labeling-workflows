import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const MicrophoneSlashAlt: React.FC<IconComponentProps> = ({
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
        <><path d="M16 10.4V7.00003C16 4.79089 14.2091 3.00003 12 3.00003C11.0406 3.00003 10.1601 3.3378 9.47086 3.90092M4 12V13C4 17.4183 7.58172 21 12 21C14.4653 21 16.6701 19.8849 18.1376 18.1316M3 3L21 21M12 17C9.79086 17 8 15.2092 8 13V8.00003L15.2815 15.288C14.5585 16.323 13.3583 17 12 17Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M2.29289 2.29289C2.68342 1.90237 3.31658 1.90237 3.70711 2.29289L21.7071 20.2929C22.0976 20.6834 22.0976 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L2.29289 3.70711C1.90237 3.31658 1.90237 2.68342 2.29289 2.29289Z" fill={color}/>
<path d="M7.15306 5.76747C7.05311 6.16173 7 6.57466 7 7V13C7 15.7614 9.23858 18 12 18C13.9971 18 15.7208 16.8291 16.5219 15.1363L7.15306 5.76747Z" fill={color}/>
<path d="M17.9974 16.6118C16.772 18.6423 14.5445 20 12 20C8.13401 20 5 16.866 5 13V12C5 11.4477 4.55228 11 4 11C3.44772 11 3 11.4477 3 12V13C3 17.9706 7.02944 22 12 22C15.0949 22 17.8249 20.4378 19.4446 18.059L17.9974 16.6118Z" fill={color}/>
<path d="M20.4144 16.2003L18.8159 14.6019C18.9363 14.0874 19 13.5511 19 13V12C19 11.4477 19.4477 11 20 11C20.5523 11 21 11.4477 21 12V13C21 14.1272 20.7928 15.206 20.4144 16.2003Z" fill={color}/>
<path d="M17 12.786L8.09325 3.87923C9.00949 2.73373 10.4191 2 12 2C14.7614 2 17 4.23858 17 7V12.786Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('microphone-slash-alt', MicrophoneSlashAlt);
