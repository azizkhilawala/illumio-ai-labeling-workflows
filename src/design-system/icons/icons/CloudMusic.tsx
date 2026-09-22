import React from 'react';
import type { IconComponentProps } from '../types';
import { registerIcon } from '../registry';

export const CloudMusic: React.FC<IconComponentProps> = ({
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
        <><path d="M13 14.5L14 14V10L10.4286 10.7143V15L9.5 15.5M8.4 19C5.41766 19 3 16.6044 3 13.6493C3 11.2001 4.8 8.9375 7.5 8.5C8.34694 6.48637 10.3514 5 12.6893 5C15.684 5 18.1317 7.32251 18.3 10.25C19.8893 10.9449 21 12.6503 21 14.4969C21 16.9839 18.9853 19 16.5 19L8.4 19Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></>
      )}
      {variant === 'solid' && (
        <><path fillRule="evenodd" clipRule="evenodd" d="M6.80892 7.62107C7.90376 5.51707 10.1141 4 12.6893 4C16.0089 4 18.7677 6.42894 19.2384 9.60789C20.9071 10.5857 22 12.4783 22 14.4969C22 17.5355 19.5382 20 16.5 20L8.4 20C4.87404 20 2 17.1653 2 13.6493C2 10.877 3.91761 8.33361 6.80892 7.62107ZM15.0002 10C15.0002 9.70042 14.8659 9.4166 14.6342 9.22667C14.4025 9.03673 14.0979 8.96067 13.8041 9.01943L10.2326 9.73371C9.76523 9.8272 9.42877 10.2376 9.42877 10.7143V14.4027L9.02609 14.6195C8.53982 14.8814 8.35788 15.4878 8.61972 15.9741C8.88156 16.4604 9.48802 16.6423 9.97429 16.3805L10.9029 15.8805C11.2268 15.7061 11.4288 15.3679 11.4288 15V11.5341L13.0002 11.2198V13.382L12.553 13.6056C12.059 13.8526 11.8588 14.4532 12.1058 14.9472C12.3528 15.4412 12.9534 15.6414 13.4474 15.3944L14.4474 14.8944C14.7862 14.725 15.0002 14.3788 15.0002 14V10Z" fill={color}/></>
      )}
    </svg>
  );
};

// Register this icon
registerIcon('cloud-music', CloudMusic);
