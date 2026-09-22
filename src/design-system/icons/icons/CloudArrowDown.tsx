import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudArrowDown: React.FC<IconComponentProps> = ({
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
        <><path d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M12.6893 2C10.1141 2 7.90376 3.51707 6.80892 5.62107C3.91761 6.33361 2 8.87702 2 11.6493C2 14.3324 3.67368 16.6188 6.03353 17.5514C6.12561 16.9392 6.40732 16.35 6.87868 15.8787C7.46447 15.2929 8.23223 15 9 15V11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11V15C15.7678 15 16.5355 15.2929 17.1213 15.8787C17.6549 16.4123 17.9455 17.0968 17.993 17.7948C20.3054 17.1438 22 15.0179 22 12.4969C22 10.4783 20.9071 8.58575 19.2384 7.60789C18.7677 4.42894 16.0089 2 12.6893 2Z" fill={color}/>
<path d="M13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V18.5858L9.70711 17.2929C9.31658 16.9024 8.68342 16.9024 8.29289 17.2929C7.90237 17.6834 7.90237 18.3166 8.29289 18.7071L11.2929 21.7071C11.6834 22.0976 12.3166 22.0976 12.7071 21.7071L15.7071 18.7071C16.0976 18.3166 16.0976 17.6834 15.7071 17.2929C15.3166 16.9024 14.6834 16.9024 14.2929 17.2929L13 18.5858V11Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-arrow-down', CloudArrowDown);
