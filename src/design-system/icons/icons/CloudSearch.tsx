import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudSearch: React.FC<IconComponentProps> = ({
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
        <><path d="M13.5 14.5L14.5 15.5M14 12.5C14 13.8807 12.8807 15 11.5 15C10.1193 15 9 13.8807 9 12.5C9 11.1193 10.1193 10 11.5 10C12.8807 10 14 11.1193 14 12.5ZM8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path d="M10.25 12.75C10.25 11.9216 10.9216 11.25 11.75 11.25C12.5784 11.25 13.25 11.9216 13.25 12.75C13.25 13.1645 13.0832 13.5381 12.8107 13.8107C12.5381 14.0832 12.1645 14.25 11.75 14.25C10.9216 14.25 10.25 13.5784 10.25 12.75Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M6.80892 7.62107C7.90376 5.51707 10.1141 4 12.6893 4C16.0089 4 18.7677 6.42894 19.2384 9.60789C20.9071 10.5857 22 12.4783 22 14.4969C22 17.5355 19.5382 20 16.5 20L8.4 20C4.87404 20 2 17.1653 2 13.6493C2 10.877 3.91761 8.33361 6.80892 7.62107ZM11.75 9.25C9.817 9.25 8.25 10.817 8.25 12.75C8.25 14.683 9.817 16.25 11.75 16.25C12.3524 16.25 12.9198 16.0973 13.4149 15.8291L14.0429 16.4571C14.4334 16.8476 15.0666 16.8476 15.4571 16.4571C15.8476 16.0666 15.8476 15.4334 15.4571 15.0429L14.8291 14.4149C15.0973 13.9198 15.25 13.3524 15.25 12.75C15.25 10.817 13.683 9.25 11.75 9.25Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-search', CloudSearch);
