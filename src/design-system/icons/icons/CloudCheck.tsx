import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudCheck: React.FC<IconComponentProps> = ({
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
        <><path d="M9 13.2222L10.8462 15L15 11M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M12.6893 4C10.1141 4 7.90376 5.51707 6.80892 7.62107C3.91761 8.33361 2 10.877 2 13.6493C2 17.1653 4.87404 20 8.4 20L16.5 20C19.5382 20 22 17.5355 22 14.4969C22 12.4783 20.9071 10.5857 19.2384 9.60789C18.7677 6.42894 16.0089 4 12.6893 4ZM15.6936 11.7203C16.0915 11.3372 16.1034 10.7042 15.7203 10.3064C15.3372 9.90854 14.7042 9.89659 14.3064 10.2797L10.8462 13.6117L9.69364 12.5019C9.29582 12.1188 8.66277 12.1308 8.27968 12.5286C7.89659 12.9264 7.90854 13.5595 8.30636 13.9425L10.1525 15.7203C10.5398 16.0932 11.1525 16.0932 11.5398 15.7203L15.6936 11.7203Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-check', CloudCheck);
