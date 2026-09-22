import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudXmark: React.FC<IconComponentProps> = ({
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
        <><path d="M10 11L14 15M14 11L10 15M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.6893 4C10.1141 4 7.90376 5.51707 6.80892 7.62107C3.91761 8.33361 2 10.877 2 13.6493C2 17.1653 4.87404 20 8.4 20L16.5 20C19.5382 20 22 17.5355 22 14.4969C22 12.4783 20.9071 10.5857 19.2384 9.60789C18.7677 6.42894 16.0089 4 12.6893 4ZM10.2071 10.2929C9.81658 9.90237 9.18342 9.90237 8.79289 10.2929C8.40237 10.6834 8.40237 11.3166 8.79289 11.7071L10.5858 13.5L8.79289 15.2929C8.40237 15.6834 8.40237 16.3166 8.79289 16.7071C9.18342 17.0976 9.81658 17.0976 10.2071 16.7071L12 14.9142L13.7929 16.7071C14.1834 17.0976 14.8166 17.0976 15.2071 16.7071C15.5976 16.3166 15.5976 15.6834 15.2071 15.2929L13.4142 13.5L15.2071 11.7071C15.5976 11.3166 15.5976 10.6834 15.2071 10.2929C14.8166 9.90237 14.1834 9.90237 13.7929 10.2929L12 12.0858L10.2071 10.2929Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-xmark', CloudXmark);
